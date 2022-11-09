# Vue Resolver

## why we should be use this ? 

```
    In every rather complex application on vue.js there is a need to get data before loading the page or check that the
    user is authorized, I thought that I could make one library with standard logic that can be reused
```

## Support

```
    vue2 - router beforeEnter
    vue3 - router beforeEnter
    nuxt BeforeEnter router hook
```

## Information

```
    Used to simplify work with the authorization system and obtain data before loading the page, 
    with the ability to check the existence of a token, get a list of data, run spinners
```

## Functionality
```
    1 - getting data from request 
    2 - check if user Authorized
    3 - start spinner
    4 - redirect if get exception
```

## How started

```
    npm i @blanderbit/vue-resolver or npm install @blanderbit/vue-resolver
```
###### global mode

```
    Information about mode - set value for all uses, what each function is for, see below
```

```
    import { VueResolver } from "@blanderbit/vue-resolver";
    
    const AltesiaRouterResolver = new VueResolver()
        .registerResolverFirstWorker(resolverFunctions.isUserAuthorized)
        .registerResolverFirstWorkerError(resolverFunctions.isAuthorizedError)
        .registerResolverSecondWorkerError(resolverFunctions.isResolveDataError)
        .registerAfterIntercept(finishSpinner)
        .registerBeforeIntercept(startSpinner);
        
    // usage for router object
    
    {
        path: 'test',
        component: TestPage,
        beforeEnter: AltesiaRouterResolver.routeInterceptor((to) => ({
            testData: () => $api.testDataRequest.get(to.query),
            testDataOne: () => $api.testDataRequest.getOne(to.query)
        }))
    } 
    
    // how get data from requests ?
    
    // open router component TestPage or TestPage nested component
    
    // you can use object route from component instance 
    
    // for example if you pass **testData** you will get data from route.meta
    
```

###### individual route mode


```
    Information about mode - set value for specific route, what each function is for, see below
```

```
    import { VueResolver } from "@blanderbit/vue-resolver";
    
    const RouterResolver = new VueResolver();
    
    const resolverGuardForSpecificPage = RouterResolver.routeInterceptor(
        () => ({}),
        {
            afterIntercept: ({ next }) => { // some checks if success
                next(ROUTES.USERS);
                finishSpinner();
            },
            resolveFirstWorkerError: ({ next }) => { // some checks if error
                next(true);
                finishSpinner();
            },
        }
    );
    
    // usage for router object
    {
        path: 'specific-page',
        component: resolverGuardForSpecificPage,
        beforeEnter: resolverGuardForLoginPage
    }, 
```

## Information about routeInterceptor params

```
    1 - oobject where keys is the name of the data, value is the callback that should return the promise or data

        {
            testData: () => Promise,
            testDataOne: () => Promise
        }
        
    2 - object where keys are names of lifecycle hooks and values ​​are callback handlers,  thanks to which you can
        custom configure resolvers for different routes
```

## Lifecycle hooks

```
    beforeIntercept - can pass for second param routeInterceptor, or fill it global registerBeforeIntercept
         usage - usually indicates that data loading has begun, for example, you can run a spinner on the page
    
    firstWorker- can pass for second param routeInterceptor - or set it global registerResolverFirstWorker  
        usage - used for primary data processing or, as a rule, checking for the existence of a token, obtaining data 
                about the user,  as an option to make a quick request to obtain data that the user is logged into the system    
                
    firstWorkerError - can pass for second param routeInterceptor, or fill it global  resolveFirstWorkerError
        usage - it is usually used when there is some kind of error when checking login data
            
    resolverSecondWorkerError - can pass for second param routeInterceptor, or fill it global resolveresolverSecondWorkerError
        usage -  is used as a rule when, upon receiving some data that we transmitted (the first to pass to second param for routeInterceptor),
                 we received some kind of error
          
    afterIntercept - can pass for second param routeInterceptor, or fill it global resolveAfterIntercept  
        usage - use when the interceptor finishes its execution, we can stop the spinner         
```

## use only getting data without auth check 

```
    firstWorker should be return - true, Promise<true>
```
#### EXAMPLES

###### getting data VUE3

```
    ----- resolver.js -----
    
    Import { VueResolver } from "@blanderbit/vue-resolver";
    
    const AltesiaRouterResolver = new VueResolver()
       .registerResolverFirstWorker(() => true)
       .registerAfterIntercept((e) => {
           // stop spinner
       })
       .registerBeforeIntercept((e) => {
           // start spinner
       });
    
    ----- router.js -----
        
    import { createRouter, createWebHistory } from 'vue-router';
    
    const routes = [
        {
            path: 'test',
            component: TestPage,
            beforeEnter: AltesiaRouterResolver.routeInterceptor((to, from) => ({
                testData: () => Promise.resolve([]) // or request and you can you "to, from" params
                testDataOne: () => $Promise.resolve({}) // or request, "to, from" params
            }))
        } 
    ]
    
    export const router = createRouter({
        history: createWebHistory('/'),
        routes
    });
    
    
    export default router;
    
    ----- TestPage.vue -----
    
    <template>
        <div>
            {{ testData }}
            {{ testDataOne }}
        </div>
    </template>
    
    <script>
        import { ref } from "vue";
        import { useRoute } from "vue-router";
    
        export default {
            setup() {
                const route = useRoute();
                return {
                    testData: ref(route.meta.testData),
                    testDataOne: ref(route.meta.testDataOne),
                }
            }
        }
    </script>

```


###### getting data with check user auth VUE3

```
    ----- resolver.js -----
    
    Import { VueResolver } from "@blanderbit/vue-resolver";
    
    const AltesiaRouterResolver = new VueResolver()
        .registerResolverFirstWorker(() => {
            // return promise for request check by user or check token, return boolean or Promise<boolean>
        })
        .registerResolverFirstWorkerError(() => //  get info about error for auth)
        .registerResolverSecondWorkerError(() => //  get info about error for data requests)
        .registerAfterIntercept((e) => {
            // stop spinner
        })
        .registerBeforeIntercept((e) => {
            // start spinner
        });
    
    ----- router.js -----
        
    import { createRouter, createWebHistory } from 'vue-router';
    
    const routes = [
        {
            path: 'test',
            component: TestPage,
            beforeEnter: AltesiaRouterResolver.routeInterceptor((to) => ({
                testData: () => Promise.resolve([]) // or request,
                testDataOne: () => $Promise.resolve({}) // or request,
            }))
        } 
    ]
    
    export const router = createRouter({
        history: createWebHistory('/'),
        routes
    });
    
    
    export default router;
    
    ----- TestPage.vue -----
    
    <template>
        <div>
            {{ testData }}
            {{ testDataOne }}
        </div>
    </template>
    
    <script>
        import { ref } from "vue";
        import { useRoute } from "vue-router";
    
        export default {
            setup() {
                const route = useRoute();
                return {
                    testData: ref(route.meta.testData),
                    testDataOne: ref(route.meta.testDataOne),
                }
            }
        }
    </script>

```
