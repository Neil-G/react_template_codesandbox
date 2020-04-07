const modelNames = ['User', 'Item']
const generatedQueryUpdaterMethods = {}

const formatUpdaterObjectArgs = args => {
  let formattedArgs = JSON.stringify(args)
  Object.keys(args).forEach(key => {
    formattedArgs = formattedArgs.replace(`"${key}"`, key)
  })
  return formattedArgs
}

modelNames.forEach(modelName => {
  // findById
  const findByIdQueryName = `find${modelName}ById`
  generatedQueryUpdaterMethods[findByIdQueryName] = function({
    id,
    returnFields = [],
    successActions = [],
  }) {
    return {
      updateType: 'api',
      serviceOptions: {
        method: 'post',
        url: '/graphql',
        data: {
          query: `query {
            ${findByIdQueryName} (id: "${id}") {id ${returnFields}}
          }`,
        },
      },
      successActions,
    }
  }
  // find many
  const findManyQueryName = `find${modelName}s`
  generatedQueryUpdaterMethods[findManyQueryName] = function({
    query = {},
    returnFields = [],
    successActions = [],
  }) {
    return {
      updateType: 'api',
      serviceOptions: {
        method: 'post',
        url: '/graphql',
        data: {
          query: `query {
            ${findManyQueryName} (query: ${formatUpdaterObjectArgs(
            query,
          )}) {id ${returnFields}}
          }`,
        },
      },
      successActions,
    }
  }
})

export default generatedQueryUpdaterMethods
