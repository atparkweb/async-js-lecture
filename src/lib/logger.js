class Logger {
  constructor() {
    this.statuses = {
      OK: 0,
      ERROR: 1,
      WAIT: 2
    };
  }

  log(message, status) {
    const icon = this.getIcon(status);
    console.log(`${icon} ${message}`);
  }

  getIcon(status) {
    let icon;
    const { OK, ERROR, WAIT } = this.statuses;

    switch (status) {
      case OK:
        icon = '✅';
        break;
      case ERROR:
        icon = '❌';
        break;
      case WAIT:
        icon = '⏳';
        break;
      default:
        icon = '';
        break;
    }

    return icon;
  }
}

module.exports = new Logger();