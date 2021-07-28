import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

//  page and layout imports
import Header from './components/Header'
const Homepage = lazy(() => import('./pages/Homepage'))
const ReviewDetails = lazy(() => import('./pages/ReviewDetails'))
const Category = lazy(() => import('./pages/Category'))

//  apollo client
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
})

const App = () => {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className='app'>
          <Header />
          <Switch>
            <Route
              exact
              path='/'
              render={() => (
                <Suspense fallback={<div>Loading...</div>}>
                  <Homepage />
                </Suspense>
              )}
            />
            <Route
              exact
              path='/details/:id'
              render={() => (
                <Suspense fallback={<div>Loading...</div>}>
                  <ReviewDetails />
                </Suspense>
              )}
            />
            <Route
              exact
              path='/category/:id'
              render={() => (
                <Suspense fallback={<div>Loading...</div>}>
                  <Category />
                </Suspense>
              )}
            />
          </Switch>
        </div>
      </ApolloProvider>
    </Router>
  )
}

export default App
