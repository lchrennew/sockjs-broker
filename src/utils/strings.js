const envVarPattern = /^[a-z_$.:\-/][a-z\d_$.:\-/]*$/i
export const toEnvVar = str => {
    if (!envVarPattern.test(str)) throw '这个字符串无法转换为环境变量名'
    return str.replaceAll(/[^a-z0-9]+/ig, '_').toUpperCase();
}
