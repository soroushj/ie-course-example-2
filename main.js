document.addEventListener('DOMContentLoaded', () => {
  console.log('content loaded');
  document.getElementById('settings').addEventListener('submit', event => {
    console.log('form submitted');
    event.preventDefault();
    let language = document.getElementById('language').value;
    let user = document.getElementById('user').value;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.github.com/search/repositories?' +
      `q=language:${language}+user:${user}`);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('response received');
        let data = JSON.parse(xhr.responseText);
        let ul = document.getElementById('repos');
        // ul.innerHTML = '';
        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
        }
        data.items.forEach(item => {
          let a = document.createElement('a');
          a.appendChild(document.createTextNode(item.full_name));
          a.href = item.html_url;
          let li = document.createElement('li');
          if (item.has_issues) {
            li.classList.add('has-issues');
          }
          li.appendChild(a);
          ul.appendChild(li);
        });
      }
    };
    xhr.send();
    console.log('request sent');
  });
});
