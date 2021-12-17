const mode = process.env[2]?.match(/^(force|alter)$/) ? process.env[2] : Symbol()

import User from `models/User`;
User.sync({ [mode]: true })
