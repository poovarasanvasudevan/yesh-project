import { useLoginStore } from "../../core/states/login-store";
import { useSetState } from "ahooks";
import { FormControlItem } from "../form/control.jsx";
import { Button, Select, TextInput } from "flowbite-react";
import { BiLock } from "react-icons/bi";
import { useModal } from "@saimin/react-modal-manager";
import { getBaseURL } from "../../core/api/api-values.jsx";
import { useEnv } from "../../core/states/env-store.jsx";

const LoginModal = ( { name }) => {
  const { setIsLoggedIn, setUserRoles , setLoSupportedApps, setAccessibleEnv, setAppCodes, appCodes} = useLoginStore();
  const {env, appCode, setAppCode} = useEnv();
  const [state, setState] = useSetState({
    loading: false,
    btnText: "Validate",
    username: "",
    password: "",
    diff:[],
    appCode:[],
    accessibleEnv:[],
    error: "",
    validationError: {
      username: "",
      password: "",
      appCode: ""
    }
  });

  const { close } = useModal()

  const dpValues = Array.from({ length: 150 }, (_, i) => i + 1);


  const validate = () => {
    if(!state.username || state.username === '') {
      setState({validationError: {username: "Username is required"}});
      return false;
    }

    if(!state.password || state.password === '') {
      setState({validationError: {password: "Password is required"}});
      return false;
    }

    return true;
  }

  const onClickSubmit = () => {
    setState({loading: true, btnText: "Validating..."});

    if(validate()) {
      fetch(getBaseURL(env) + `validateldapcredentials`, {
        method: 'POST',
        mode:'cors',
        body: JSON.stringify({
          userId: state.username,
          usrval: state.password,
          env: env,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then((result) => {
          setUserRoles(result.usr_roles);
          setLoSupportedApps(result.lo_support_apps);

          const diff = result.app_cd.filter(x => !result.lo_support_apps.includes(x));
          setState({diff: diff});

          if(result.anthemID) {
            setIsLoggedIn(true, result.anthemID);
            setAppCodes(result.app_cd)
            setAccessibleEnv(result.assessible_environment);
            setState({
              appCode:  result.app_cd,
              loading: false,
              loginAppCode: result.app_cd.length === 1 ? result.app_cd[0] : '',
              accessibleEnv: result.assessible_environment,
              btnText: "Login"
            })

          } else {
           setState({
            error: "Invalid Username or Password",
            loading: false,
            btnText: "Validate"
           })
          }
        })
    }
  }

  return (
      <div className={'flex-1 flex w-[400px] bg-white flex-col p-6 rounded-lg'}>
        <div className={'flex items-center justify-center pb-4'}>
          <div className={'bg-blue-500 rounded-full p-2'}>
            <BiLock size={22} color={'white'}/>
          </div>
        </div>

        <FormControlItem label="Username" id="username" error={state.validationError.username}>
          <TextInput id="username" required value={state.username} onChange={(e) => setState({
            username: e.target.value
          })} sizing={'sm'} />
        </FormControlItem>

        <FormControlItem label="Password" id="password" error={state.validationError.password}>
          <TextInput id="password" type={'password'} required password={state.password} onChange={(e) => setState({
            password: e.target.value
          })} sizing={'sm'} />
        </FormControlItem>


        {appCodes.length > 1 && (
          <FormControlItem label="App Code" id="app-code">
            <Select id="app-code" sizing={'sm'} onChange={(e) => setAppCode(e.target.value)}>
              {appCodes.map((val) => (
                <option value={val} key={val}>{val}</option>
              ))}
            </Select>
          </FormControlItem>
        )}

        <div className={'flex space-x-2'}>
          <div className={'flex-1'}></div>
          <Button color="blue" size="xs" className={'mt-4'} onClick={onClickSubmit}>{state.btnText}</Button>
          <Button color="failure" size="xs" className={'mt-4'} onClick={() => close(name)}>Cancel</Button>
        </div>
      </div>
  );
};

export default LoginModal;
