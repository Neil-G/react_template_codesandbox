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
            args: { query, updates, successActions }, 
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
})

export default generatedMutationUpdaterMethods