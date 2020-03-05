const modelNames = ['User']
const generatedMutationUpdaterMethods = {}

const formatUpdaterObjectArgs = args => {
    let formattedArgs = JSON.stringify(args)
    Object.keys(args).forEach(key => {
        formattedArgs = formattedArgs.replace(`"${key}"`, key)
    })
    return formattedArgs
}

modelNames.forEach(modelName => {
    let mutationName

    // findOneAndUpdate
    mutationName = `findOne${modelName}AndUpdate`
    generatedMutationUpdaterMethods[mutationName] = function ({ query = {}, updates = {}, successActions = [] }) {
        return {
            updateType: 'api',
            serviceOptions: {
                method: 'post',
                url: '/graphql',
                data: {
                    query: `mutation {
                        ${mutationName}(query: ${formatUpdaterObjectArgs(query)}, updates: ${formatUpdaterObjectArgs(updates)}) {
                            ${Object.keys(updates).join(' ')}
                        }
                    }`
                }
            },
            successActions
        }
    }

    // findByIdAndUpdate
    mutationName = `find${modelName}ByIdAndUpdate`
    generatedMutationUpdaterMethods[mutationName] = function ({ userId, updates = {}, successActions = [] }) {
        return {
            updateType: 'api',
            serviceOptions: {
                method: 'post',
                url: '/graphql',
                data: {
                    query: `mutation {
                        ${mutationName}(userId: "${userId}", updates: ${formatUpdaterObjectArgs(updates)}) {
                            ${Object.keys(updates).join(' ')}
                        }
                    }`
                }
            },
            successActions
        }
    }
})

export default generatedMutationUpdaterMethods