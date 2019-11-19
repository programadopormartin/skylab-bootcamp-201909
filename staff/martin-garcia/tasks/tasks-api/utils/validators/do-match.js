module.exports = function(name, target, ...values) {
    return values.includes(target)
}