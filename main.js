var getPromisify = (url) => {
  return new Promise((resolve, reject) => {
    $.get(url, (response, status) => {
      if (status === 'success') {
        resolve({ response, status })
      } else {
        const err = new Error('error occured during get request')
        reject(err)
      }
    })
  })
}

var postPromisify = (url, data) => {
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (data) => {
      console.log(data)
    },
    error: (errMsg) => {
      console.log(errMsg)
    }
  })
}

(function () {
  const template = document.createElement('template')
  template.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `
  class MainWebComponent extends HTMLElement {
    // ------------------
    // Scripting methods
    // ------------------
    async get(url) {
      await getPromisify(url)
    }

    async post(url, data) {
      postPromisify(url, data)
    }
  }
  customElements.define('com-sap-stories', MainWebComponent)
})()
