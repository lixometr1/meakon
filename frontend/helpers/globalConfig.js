export default process.env.NODE_ENV === 'development' ? require('../../common/config/config.development') : require('../../common/config/config.production')