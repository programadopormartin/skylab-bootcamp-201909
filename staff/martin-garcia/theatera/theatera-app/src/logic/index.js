module.exports = {
    registerUser: require('./register-user'),
    authenticate: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    retrieveLatestPosts: require('./retrieve-latest-posts'),
    retrieveCompleteUser: require('./retrieve-complete-user'),
    toggleLikePost: require('./toggle-like-post'),
    retrievePost: require('./retrieve-post'),
    sendComment : require('./send-comment'),
    retrieveConnections: require('./retrieve-connections'),
    removeSkillItem: require('./remove-skill-item'),
    createSkillItem: require('./create-skill-item'),
    createExperienceItem: require('./create-experience-item'),
    removeExperienceItem: require('./remove-experience-item'),
    retrievePersonalInfo: require('./retrieve-personal-info'),
    updateUser: require('./update-user'),
    updateProfileImage: require('./update-profile-image')
}