# element-collapse

performs an expand/collapse transition on an element

## install

```shell
yarn add element-collapse
```

## use

```js
import { expand, collapse } from 'element-collapse'

const el = document.querySelector('#my-element')
expand(el, () => {
  // callback for when the element is fully transitioned
  // you can emit events from here, or target content inside 'el'
})
```
