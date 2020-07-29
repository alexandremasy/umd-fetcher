# UMD Fetcher
> A basic UMD module fetcher.

## Why

Because I can.

While building a large application means some part of the codebase will be irrelevant to the user at a certain moment. Therefor let's only load the part the user need at the right moment. Lazy loading is the key to improve reactivity and happiness of our user.

## How

1. Install the lib: `yarn add umd-fetcher`
2. Use it like so:
```
import UMDFetcher from 'umd-fetcher'

UMDFetcher.fetch({url: 'your-umd-package.umd.min.js', name:'your-umd-package-name'})
.then((module) => {
  console.log('module', module);
});
```

## API

`fetch({name <String>, url <String>):Promise:Module`

Fetch the module from the given url. 

The name of the umd module is used to avoid naming collision and prevent multiple loading. It is defined during the build time of the umd module. With webpack it is defined [with the output.library param](https://webpack.js.org/configuration/output/#outputlibrary).



`exists({name <String>}):Boolean`

Check whether or not the module already exists.



`get({name <String>}):Module`

Return the umd module with the given name.

If the module is not found or not loaded, an error will be thrown.