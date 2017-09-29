
/**
 * Module Dependencies
 */

const mongoRequests = require('../dbQueries/mongodb/queries');
const texts = require('../texts/texts');

const auth = {

    /**
     * Authenticate User
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     */

    isAuth: (req, res, next) => {
        if (!req.headers.authorization) {
            res.status(401);
            res.json({ message: texts.unauthorized });
            return;
        }

        const token = req.headers.authorization;
        mongoRequests.checkToken(token, (err, result) => {
            if (err) {
                res.status(404);
                res.json(result);
                return;
            }
            return next();
        });

    }
};

module.exports = auth;