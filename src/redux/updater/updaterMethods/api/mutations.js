const modelNames = ['User', 'Item']
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
  const findOneAndUpdateMutationName = `findOne${modelName}AndUpdate`
  generatedMutationUpdaterMethods[findOneAndUpdateMutationName] = function({
    query = {},
    updates = {},
    successActions = [],
  }) {
    return {
      updateType: 'api',
      serviceOptions: {
        method: 'post',
        url: '/graphql',
        data: {
          query: `mutation {
                        ${findOneAndUpdateMutationName}(query: ${formatUpdaterObjectArgs(
            query,
          )}, updates: ${formatUpdaterObjectArgs(updates)}) {
                  ${Object.keys(updates).join(' ')}
              }
          }`,
        },
      },
      successActions,
    }
  }

  // findByIdAndUpdate
  const findByIdAndUpdateMutationName = `find${modelName}ByIdAndUpdate`
  generatedMutationUpdaterMethods[findByIdAndUpdateMutationName] = function({
    id,
    updates = {},
    successActions = [],
  }) {
    return {
      updateType: 'api',
      serviceOptions: {
        method: 'post',
        url: '/graphql',
        data: {
          query: `mutation {
              ${findByIdAndUpdateMutationName}(id: "${id}", updates: ${formatUpdaterObjectArgs(
            updates,
          )}) {
                id   ${Object.keys(updates).join(' ')}
              }
          }`,
        },
      },
      successActions,
    }
  }

  const createMutationName = `create${modelName}`
  generatedMutationUpdaterMethods[createMutationName] = function({
    data = {},
    successActions = [],
  }) {
    return {
      updateType: 'api',
      serviceOptions: {
        method: 'post',
        url: '/graphql',
        data: {
          query: `mutation {
              ${createMutationName}(data: ${formatUpdaterObjectArgs(data)}) {
                id  ${Object.keys(data).join(' ')}
              }
          }`,
        },
      },
      successActions,
    }
  }
})

export default generatedMutationUpdaterMethods
