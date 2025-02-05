export const CommonFunc = {
  SetColor(params) {
    let backgroundColor = '';
    let color = 'white';
    switch (params.value) {
      case 'FAILED':
      case 'SCHEDULED_FAILED':
        backgroundColor = '#f44336'
        break;
      case 'ABANDONED_REPROCESSED':
      case 'SUCCEEDED_REPROCESSED':
      case 'FAILED_REPROCESSED':
      case 'SKIPPED_REPROCESSED':
        backgroundColor = '#efb359'
        break;
      case 'SUCCEEDED':
      case 'FORCE_SCHEDULED_PROCESSED':
      case 'FORCE_SUCCEEDED':
      case 'SCHEDULED_PROCESSED':
      case 'COMPLETED':
        backgroundColor = '#4caf50'
        break;
      case 'INIT':
        backgroundColor = '#25AFA0'
        break;
      case 'SCHEDULED_HOLD':
        backgroundColor = '#FFA500'
        break;
      case 'IN-PROGRESS':
      case 'SCHEDULED_WAITING':

        backgroundColor = '#2196f3'
        break;
      case 'SKIPPED':
      case 'SCHEDULED_SKIPPED':
        backgroundColor = '#FFFF66'
        color = 'black'
        break;
      case 'ABANDONED':
      case "SCHEDULED_DEACTIVATED":
        backgroundColor = '#ff9800'
        break;
      case 'WAITING':
      case 'STARTED':
      case 'STARTING':
        backgroundColor = '#ff8c00'
      // eslint-disable-next-line no-fallthrough
      default:
        break;

    }
    return {
      backgroundColor: backgroundColor,
      color: color,
    };
  },
  convertTZ(dateTime) {
    if (!dateTime) {
      return ""
    }

    const cTime = new Date(dateTime.replace(" ", "T") + ".000Z")
    return cTime.toLocaleString('en-US', { timeZone: "America/New_York" })
  }
}