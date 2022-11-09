
interface CustomFunctions {
    resolverSecondWorker?: void;
    resolveFirstWorkerError?: void;
    beforeIntercept?: void;
    afterIntercept?: void;
    resolveSecondWorkerError?: void;
}

/**
 *  VueResolver
 *
 *  definition - creates methods, hooks, properties designed to control the
 *               intermediate moment of transition through routing vue.js
 *
 *  usage - used only in vue.js, namely in the beforeEnter router hook
 *
 */

export declare class VueResolver {

    /**
     *
     *  _defFunction
     *
     *  definition - is intended to set the default value
     *               of the method to be registered
     *
     *  usage - used in places where it will call a synchronous call
     *
     *  @template ret
     *
     *  @param ret
     *  @return {(ret | {})}
     *  @private
     */

    _defFunction: void;

    /**
     *
     *  _defFunctionPromise
     *
     *  definition - is intended to set the default value of
     *               the method to be registered
     *
     *  usage - used in places where it will async call
     *
     *  @return {Promise<boolean>}
     *  @private
     */

    _defFunctionPromise: void;

    /**
     *
     *  _beforeIntercept
     *
     *  definition - the hook is launched at the very
     *               beginning of resolver processing
     *
     *  usage - usually used to launch a spinner
     *
     *  @type {function(*): {}}
     *  @private
     */

    _beforeIntercept: void;


    /**
     *
     *  _afterIntercept
     *
     *  definition - the hook starts at the very end of the resolver
     *
     *  usage - usually used to hide a spinner
     *
     *  @type {function(*): {}}
     *  @private
     */

    _afterIntercept: void;

    /**
     *
     *  _resolverFirstWorker
     *
     *  definition - hook is used to make the 1st level of
     *               verification before the transition stage
     *
     *  usage - used mainly to get a user and check for login,
     *          but if this system is not needed then it is disabled by default
     *
     *  @type {function(): Promise<boolean>}
     *  @private
     */

    _resolverFirstWorker: void;

    /**
     *
     * _resolverSecondWorker
     *
     *  definition - hook is used to make the 2nd level of data retrieval,
     *               by default the standard function for parallel data retrieval is used
     *
     *  usage - used to receive data in parallel,
     *          requests are defined in the callback itself
     *
     *  @type {function(*=)}
     *  @private
     */

    _resolverSecondWorker: void;

    /**
     *
     * _resolverFirstWorkerError
     *
     *  definition - an error handler if we got false during the first step of the check
     *
     *  usage - used as a rule to check that the user is logged
     *          in or not, if not, then you can take the appropriate action
     *
     * @type {function(*): {}}
     * @private
     */

    _resolverFirstWorkerError: void;

    /**
     *
     *  _resolverFirstWorkerError
     *
     *  definition - error handler when receiving data
     *
     *  usage - used as a rule to check that there is some problem in receiving data
     *
     * @type {function(*): {}}
     * @private
     */

    _resolverSecondWorkerError: void;

    /**
     *  This callback type is called `requestCallback` and is displayed as a global symbol.
     *
     *  @callback resolverCallback
     *  @param { object } to - object for "to" route
     *  @param { object } from - object for "from" route
     *
     *  @return { Object } object of functions method which return promise
     */

    /**
     *
     *  routeInterceptor
     *
     *  definition - function handler, with the implementation of
     *               the hooks of the interceptor's life, is made to intercept the moment
     *               of transition on the page, with the possibility of receiving data
     *               and flexible management of the authorization system
     *
     *  usage - used as a rule in cases of receiving data
     *          before going to the page, all data is
     *          requested in parallel, combining such images
     *
     *          loader. displaying errors,
     *          receiving data, checking for a logged in user
     *
     *  @param resolverCallback { function }
     *  @param customFunctions {{
     *      resolverSecondWorker: undefined | function,
     *      resolveFirstWorkerError: undefined | function,
     *      beforeIntercept: undefined | function,
     *      afterIntercept: undefined | function,
     *      resolveSecondWorkerError: undefined | function
     *  }} check resolver methods, its the same but for custom usage, not for global
     *
     *  @return { Function | Promise }
     */

    routeInterceptor(
        resolverCallback: void,
        customFunctions: CustomFunctions
    ): Promise<void> | void

    /**
     *  _defaultSecondWorker
     *
     *  definition - and gets a function object, where each
     *               function returns a promise, done in order to
     *               make parallel requests and return a response object
     *
     *  usage - check definition
     *
     *  @param objRequests
     *  @return {Promise<void>}
     *  @private
     */

    _defaultSecondWorker (
        objRequests: {
            [key: string]: void
        }
    ): {
        [key: string]: any
    }

    /**
     *
     *  registerBeforeIntercept
     *
     *  definition - function registration
     *
     *  @param fn
     *  @return {*}
     */

    registerBeforeIntercept(fn: void): VueResolver

    /**
     *  registerAfterIntercept
     *
     *  definition - function registration
     *
     *  @param fn
     *  @return {*}
     */

    registerAfterIntercept(fn: void): VueResolver

    /**
     *
     *  registerResolverFirstWorker
     *
     *  definition - function registration
     *
     *  @param fn
     *  @return {*}
     */

    registerResolverFirstWorker(fn: void): VueResolver

    /**
     *
     *  registerResolverSecondWorker
     *
     *  definition - function registration
     *
     *  @param fn
     *  @return {*}
     */

    registerResolverSecondWorker(fn: void): VueResolver


    /**
     *
     *  registerResolverFirstWorkerError
     *
     *  definition - function registration
     *
     *  @param fn
     *  @return {*}
     */

    registerResolverFirstWorkerError(fn: void): VueResolver


    /**
     *
     *  registerResolverSecondWorkerError
     *
     *  definition - function registration
     *
     *  @param fn
     *  @return {*}
     */

    registerResolverSecondWorkerError(fn): VueResolver

    /**
     *  registerMethod
     *
     *  definition - reusable function, which takes the name of
     *               the method and the callback, thereby reassigning
     *               the default execution
     *
     *  usage - used to register different methods
     *
     *  @param name
     *  @param callBack
     *  @return {VueResolver}
     */

    registerMethod(name: string, callBack: void): VueResolver
}
