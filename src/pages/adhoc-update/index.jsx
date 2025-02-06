import { useLoginStore } from "../../core/states/login-store";
import { useSetState } from "ahooks";
import { Alert , Select, TextInput, Button, Textarea } from "flowbite-react";
import { IoIosAdd, IoIosTrash } from "react-icons/io";
import { FormControlItem } from "../../components/form/control.jsx";
import { useEffect } from "react";
import { useEnv } from "../../core/states/env-store.jsx";
import { getBaseURL } from "../../core/api/api-values.jsx";
import { DialogSkeleton } from "../../components/dialogs/dialog-skeleton.jsx";
import { useModal } from "@saimin/react-modal-manager";
import LoginModal from "../../components/dialogs/login-modal.jsx";
import { AlertDialog } from "../../components/dialogs/alert-dialog.jsx";

const AdhocUpdate = () => {
  const { isLoggedIn, userRoles, loSupportedApps,appCodes, loggedInAttributes } = useLoginStore();
  const { appCode, env} = useEnv()
  const [state, setState] = useSetState({
    columns: [
      {
        name: "",
        value: "",
      },
    ],
    textAreaValue: "",
    tables: [],
    selectedTable: "",
    query: '',
    tableColumns:[]
  });

  const permissionRoleList = ['AEDLLOADMIN', 'EDLDEVOPS', 'LOAPPIM']
  const denyRoleList = ['ADMIN']

  const { open, close } = useModal();


  const isAllowed = userRoles?.filter(x => permissionRoleList.includes(x))
  const isNotAllowed =  userRoles?.filter(x => denyRoleList.includes(x))
  const isDisabled = appCode === 'ALL' || !isLoggedIn  || (env === 'prod'&& isNotAllowed.length > 0);

  const fetchTables = async () => {
    await fetch(getBaseURL(env) + `getjobportalparms?env=${env}&dropDownCol=cnfg_tbl_nms&fetchFrom=supportParms`)
      .then(res => res.json())
      .then(tableData => {
        let tables = tableData.cnfg_tbl_nms;
        let tableDatas = tables.map(x => ({ tableName: x}))
        setState({ tables: [{tableName: ""},...tableDatas] });
      })
  }

  const fetchColumns = async (tableName) => {
    if (tableName === undefined || tableName.tableName === undefined) return;
    let tblName = tableName.tableName.replace(' ', '');

    let txtAreaValue = `WHERE aplctn_cd='${appCode}'`
    if(tableName.tableName === 'falcon_meta_cfg') {
      txtAreaValue = `WHERE aplctn_cd='${appCode}' AND meta_id=''`
    } else if(tableName.tableName === 'falcon_meta_tbl_stats') {
      txtAreaValue = `WHERE aplctn_cd='${appCode}' AND stats_id=''`
    }

    setState({textAreaValue: txtAreaValue})

    await fetch(getBaseURL(env) + `getmetadata?env=${env}&rqstMtdata=fetchColumns&table_nm=${tblName}&fetchFrom=supportParms&usr_role=${userRoles.join(',')}&app_cd=${appCode}&lo_support_apps=${loSupportedApps.join(',')}`)
      .then(res => res.json())
      .then(data => {
        let columns = data.column_name.map(x => ({ columnName: x, isVisible: true }));
        setState({ tableColumns: [{columnName: "", isVisible: true}, ...columns] });
      })
  }


  useEffect(() => {
    setState({textAreaValue: `WHERE aplctn_cd='${appCode}'`})
    fetchTables()
  },[appCode])

  const onTableChange = async (e) => {
    setState({ selectedTable: e.target.value });
    await fetchColumns({ tableName: e.target.value });
  }


  const onAddColumn = () => {
    setState((prev) => ({
      columns: [...prev.columns, { name: "", value: "" }],
    }));
  };

  const onDeleteColumn = (index) => {
    setState((prev) => {
      const columns = [...prev.columns];
      columns.splice(index, 1);
      return { columns };
    });
  };


  const onColumnChange = (e, index) => {
    const { name, value } = e.target;
    setState((prev) => {
      const columns = [...prev.columns];
      columns[index] = { name, value };
      return { columns };
    });
  }

  const onColumnValueChanged = (e, index) => {
    const { name, value } = e.target;
    setState((prev) => {
      const columns = [...prev.columns];
      columns[index] = { name, value };
      return { columns };
    });
  }

  const onTextAreaValueChange = (e) => {
    const {  value } = e.target;
    setState({ textAreaValue: value });
  }

  const frameQuery = () => {
    let updateQuery = `UPDATE ${state.selectedTable} SET `;
    state.columns.forEach((column, index) => {
      updateQuery += `${column.name} = ${column.value}`;
      if (index < state.columns.length - 1) {
        updateQuery += ", ";
      }
    });
    updateQuery += ` ${state.textAreaValue}`;
    return updateQuery;
  }

  const onConfirm = (name) => {
    close(name);
    initSubmit();
  }

  const initSubmit = () => {
    const updateBodyParams = {
      updt_qury: state.query,
      where_cond: state.textAreaValue,
      aplctn_cd: appCode,
      reqstr_id: loggedInAttributes,
      loginAppCodes: appCodes,
      tbl_nm: state.selectedTable,
      usr_role: userRoles
    }

    let url = getBaseURL(env) + `setactvflag?env=${env}&updtMtdata=adhocUpdt&autocommit=false`
    fetch(url, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(updateBodyParams),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then((result) => {
        if(result.status === 202) {
          open('final-modal', {
            content: <FinalQueryDialog title={'Error'} message={result.message} name={'final-modal'} />
          })
        } else {
          showAlertDialog(result)
        }
      })
      .catch(err => {
        showAlertDialog(err.message)
      })
  }

  const onCommit = (name) => {
    close(name);
    const updateBodyParams = {
      updt_qury: state.query,
      where_cond: state.textAreaValue,
      aplctn_cd: appCode,
      reqstr_id: loggedInAttributes,
      loginAppCodes: appCodes,
      tbl_nm: state.selectedTable,
      usr_role: userRoles
    }
    let url = getBaseURL(env) + `setactvflag?env=${env}&updtMtdata=adhocUpdt&autocommit=true`
    fetch(url, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(updateBodyParams),
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          if (responseJson.status === 200)
            showAlertDialog(responseJson.message,"Message");
          else
            showAlertDialog(responseJson, "Message");
        }
      })
      .catch(() => {
        showAlertDialog('Error occurred, please try again later.');
      });
  }

  const showAlertDialog = (message, title='Error') => {
    open('error-modal', {
      content: <AlertDialog title={title} message={message} name={'error-modal'} />
    })
  }

  const QueryPreviewDialog = ( { query, name  }) => {
    return (
      <DialogSkeleton
        title={'Query Preview'}
        className={'w-[600px] min-h-[200px]'} id={name}
        footer={
          <div className={'p-4 flex justify-end space-x-2'}>
            <Button color={'failure'} size="xs" onClick={() => close(name)}>
              Close
            </Button>
            <Button color={'success'} size="xs" onClick={() => onConfirm(name)}>
              Confirm
            </Button>
          </div>
        }>

        <div className={'flex flex-col px-6 py-4'}>
          <div className={'text-[14px]'}>
            {query}
          </div>
          <div className={'mt-4'}>
            {!query.includes('job_id') && (
              <Alert color={'warning'}>
                <b>Warning</b>
                <span>Job ID is missing in Where Condition, Please verify query again to avoid bulk update before confirming.</span>
              </Alert>
            )}
          </div>
        </div>
      </DialogSkeleton>
    )
  }
  const FinalQueryDialog = ( { query, name  }) => {
    return (
      <DialogSkeleton
        title={'Query Preview'}
        className={'w-[600px] min-h-[200px]'} id={name}
        footer={
          <div className={'p-4 flex justify-end space-x-2'}>
            <Button color={'failure'} size="xs" onClick={() => close(name)}>
              Close
            </Button>
            <Button color={'success'} size="xs" onClick={() => onCommit(name)}>
              Commit
            </Button>
          </div>
        }>

        <div className={'flex flex-col px-6 py-4'}>
          <div className={'text-[14px]'}>
            {query}
          </div>
        </div>
      </DialogSkeleton>
    )
  }

  const handleSubmit = () => {
    let updateQuery = frameQuery();
    setState({ query: updateQuery });

    open('query-modal', {
      content: <QueryPreviewDialog query={updateQuery} name='query-modal' />
    });
  }

  return (
    <>
      <div className={'p-4'}>
        <div className={'font-semibold text-[20px]'}>Ad-hoc Updates</div>
      </div>

      <div className={'flex-1 flex h-[100%]'}>
        {isLoggedIn ? (
          <Alert color="warning">Login to Perform Updates</Alert>
        ) : (
          <div className={'flex px-4 gap-8'}>
            <div className={'flex flex-col gap-1 w-[700px]'}>

              <FormControlItem label="Table Name" id="table-name">
                <Select id="table-name" required sizing={'sm'} onChange={onTableChange}>
                  {state.tables.map((table, index) => (
                    <option value={table.tableName} key={index}>
                      {table.tableName}
                    </option>
                  ))}
                </Select>
              </FormControlItem>

              <div className={'flex flex-col gap-1 pt-2'}>
                {state.columns.map((column, index) => (
                  <div className={'flex flex-row gap-2'} key={'x' + index}>

                    <FormControlItem label="Column Name" id="column-name">
                      <Select id="column-name" required sizing={'sm'} className={'w-[200px]'} onChange={(e) => onColumnChange(e, index)}>
                        {state.tableColumns.map((column, index) => (
                          <option value={column.columnName} key={`col_`+index}>
                            {column.columnName}
                          </option>
                        ))}
                      </Select>
                    </FormControlItem>

                    <FormControlItem label={'Column Value'} id={'column-name'}>
                      <TextInput id={'column-value'} required sizing={'sm'} className={'w-[300px]'} onChange={(e) => onColumnValueChanged(e, index)} />
                    </FormControlItem>



                    <div className={'flex pt-3 gap-1 items-end'} >
                      <Button size="xs" onClick={onAddColumn}>
                        <IoIosAdd size={20} />
                      </Button>

                      {index > 0 && (
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => onDeleteColumn(index)}
                        >
                          <IoIosTrash  size={20} />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <FormControlItem label="Query" id="Query" className={'mt-2'}>
                  <Textarea id="Query"
                            value={state.textAreaValue}
                            onChange={onTextAreaValueChange}
                            required rows={8} placeholder="Where aplctn_cd='ALL'" className={'w-full'} />
              </FormControlItem>

              <div className={'mt-3'}>
                <Button  size="xs" onClick={handleSubmit} disabled={isDisabled}>
                  Submit
                </Button>
              </div>
            </div>
            <div className={'flex flex-col gap-2 w-[350px]'}>
              <div className={'px-2 py-2 rounded'}>
                <ul>
                  <li>
                    <div className={'text-[15px]'}>
                      <b>Disclaimer:</b> Update command will be formed as is
                      provided by User
                    </div>
                  </li>
                  <li>
                    <div className={'text-gray-500 text-[15px]'}>
                      <b> *</b> Wrap column value with (') single quote
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdhocUpdate;
