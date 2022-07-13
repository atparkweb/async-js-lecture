class Logger {
  success(message) {
    this.log(message, '✅');
  }

  error(message) {
    this.log(message, '❌');
  }

  pending(message) {
    this.log(message, '⏳');
  }

  log(message, icon) {
    console.log(`${icon} ${message}`);
  }

  divider(length=10) {
    console.log("=".repeat(length));
  }
}

module.exports = new Logger();
