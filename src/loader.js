/**
 * UMD Module Fetcher
 * 
 * @constructor
 */
export default class UMDFetcher{

  /**
   * Check whether or not the module already exists.
   * 
   * @param {Object} args The arguments
   * @param {String} args.name - The name of the module to look for.
   * @returns {Boolean} - Return true if the module already exists, false if not.
   * @static
   */
  static exists({ name }){
    return window.hasOwnProperty(name)
  }

  /**
   * Return the umd module
   * 
   * @param {Object} args - The arguments
   * @param {String} args.name - The name of the module.
   */
  static get({name, fn = 'default'}){
    if (!UMDFetcher.exists(name)){
      throw `The requested module with the name "${name}" does not exists.`
    }
    
    return window[name]
  }

  /**
   * Fetch an umd module
   * 
   * @param {Object} args The arguments
   * @param {String} args.url - The url to load
   * @param {String} args.name - The name of the module. Must be unique.
   * @returns {Promise}
   * @static
   */
  static fetch({ url, name }) {
    if (UMDFetcher.exists({name})) {
      return Promise.resolve( UMDFetcher.get(name) )
    }

    let ret = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.async = true;
      script.type = 'module';

      let onLoad = () => {
        script.removeEventListener('load', onLoad);
        script.removeEventListener('error', onError);

        let i = setInterval(() => {
          if (UMDFetcher.exists({name})){
            clearInterval(i);
            resolve( UMDFetcher.get({name}) );
          }
        }, 1)
      };

      let onError = () => {
        script.removeEventListener('load', onLoad);
        script.removeEventListener('error', onError);

        reject(new Error(`Error loading ${url}`));
      };

      script.addEventListener('load', onLoad);
      script.addEventListener('error', onError);
      script.src = url;
      document.head.appendChild(script);
    });

    return ret;
  }
}