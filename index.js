const windowExists = (typeof window !== 'undefined')

const removeTransition = el => {
  el.style.transition = null
  el.style.backfaceVisibility = null
  el.style.overflow = null
}

const addTransition = el => {
  el.style.transition = 'height var(--f-expansion-duration, 0.3s)'
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

/*
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

/*
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
