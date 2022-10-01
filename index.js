let select = document.querySelector('select')
let ul = document.querySelector('ul')

let url = 'https://api.spaceflightnewsapi.net/v3/articles?_limit=30'

// displayUi
function displayUi(array) {
  array.forEach((elm) => {
    let li = document.createElement('li')
    let img = document.createElement('img')
    img.src = elm.imageUrl
    let div = document.createElement('div')
    let span = document.createElement('span')
    span.innerText = elm.newsSite
    let p = document.createElement('p')
    p.innerText = elm.summary
    let a = document.createElement('a')
    a.href = elm.url
    let btn = document.createElement('button')
    btn.innerText = 'Reed more'
    // append
    a.append(btn)
    div.append(span, p, a)
    li.append(img, div)
    ul.append(li)
  })
}

// creatOption

function creatOption(array) {
  let arr = []
  array.forEach((elm) => {
    arr.push(elm.newsSite)
  })
  arr = [...new Set(arr)]
  for (let source of arr) {
    let option = document.createElement('option')
    option.innerText = source
    option.value = source
    select.append(option)
  }
}

let data = fetch(url)
  .then((res) => res.json())
  .then((array) => {
    displayUi(array)
    creatOption(array)
  })
  .catch((error) => {
    if (!navigator.onLine) {
      let p = document.createElement('p')
      p.innerText = 'Please check your enternet 📶'
      p.style.color = 'red'
      p.style.fontSize = '4rem'
      p.style.textAlign = 'center'
      ul.append(p)
    } else {
      let p = document.createElement('p')
      p.innerText = `Something went wrong... 404`
      p.style.color = 'red'
      p.style.fontSize = '4rem'
      p.style.textAlign = 'center'
      ul.append(p)
    }
  })

select.addEventListener('change', (e) => {
  ul.innerHTML = ''
  let data = fetch(url)
    .then((res) => res.json())
    .then((array) => {
      let d = array.filter((obj) => {
        if (e.target.value == 'select a new source') {
          ul.innerHTML = ''
          displayUi(array)
        } else {
          return obj.newsSite == e.target.value
        }
      })
      displayUi(d)
    })
})
