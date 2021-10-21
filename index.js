const windowExists = (typeof window !== 'undefined')

let prefersMotion = true

if (windowExists) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  const callback = ({ matches }) => prefersMotion = !matches
  query.addEventListener('change', callback)
  callback(query)
}

const removeTransition = el => {
  el.style.transition = null
  el.style.backfaceVisibility = null
  el.style.overflow = null
}

const addTransition = (el) => {
  // we set timing to something insanely short
  // when reducing motion so the after-* hooks still fire
  const timing = prefersMotion ? 'var(--f-expansion-duration, 0.3s)' : '0.01s'
  el.style.transition = `height ${timing}`
  el.style.backfaceVisibility = 'hidden'
  el.style.overflow = 'hidden'
}

const getAfterExpandCallback = (el, done) => () => {
  el.style.height = 'auto'
  el.style.overflow = null
  if (done) done()
}

const getAfterCollapseCallback = (done) => () => {
  if (done) done()
}

/**
 * Transitions an element from 0 to a detected height
 * @type {(el: HTMLElement, done?: function) => void}
 */
export const expand = (el, done) => {
  const afterExpandCallback = getAfterExpandCallback(el, done)
  removeTransition(el)
  el.style.height = 'auto'
  let dest = el.scrollHeight
  windowExists && requestAnimationFrame(() => {
    el.addEventListener('transitionend', afterExpandCallback, { once: true })
    el.style.height = '0px'
    el.style.transitionTimingFunction = 'ease-out'
    addTransition(el)
    requestAnimationFrame(() => el.style.height = dest + 'px')
  })
}

/**
 * Transitions an element from 0 to a detected height
 * @type {(el: HTMLElement, done?: function) => void}
 */
export const collapse = (el, done) => {
  const afterCollapseCallback = getAfterCollapseCallback(done)
  removeTransition(el)
  let original = el.scrollHeight
  windowExists && requestAnimationFrame(() => {
    el.addEventListener('transitionend', afterCollapseCallback, { once: true })
    el.style.height = original + 'px'
    el.style.transitionTimingFunction = 'ease-in'
    addTransition(el)
    requestAnimationFrame(() => el.style.height = '0px')
  })
}
