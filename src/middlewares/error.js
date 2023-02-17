const chalk = require('chalk');

module.exports = (err, req, res, next) => {
    console.log(chalk.magentaBright.italic.bold(err));

    if (err.name === 'JsonWebTokenError') { err.statusCode = 401 }
    else if (err.name === 'SequelizeDatabaseError') { err.statusCode = 400 }
    else if (err.name === 'SequelizeValidationError') { err.statusCode = 400 }
    else if (err.name === 'SequelizeUniqueConstraintError') { err.statusCode = 400 }
    else if (err.name === 'SequelizeForeignKeyConstraintError') { err.statusCode = 400 }

    res.status(err.statusCode || 500).json({ message: err.message });
};