console.log('Starting up');

var gProjs =   [
    {
    "id": "sokoban",
    "name": "Sokoban",
    "title": "Better push those boxes",
    "desc": "lorem ipsum lorem ipsum lorem ipsum",
    "url": "projs/sokoban",
    "publishedAt": 1448693940000,
    "labels": ["Matrixes", "keyboard events"],
  },
  {
    "id": "minesweeper",
    "name": "Minesweeper",
    "title": "Find all those bombs",
    "desc": "lorem ipsum lorem ipsum lorem ipsum",
    "url": "projs/minesweeper",
    "publishedAt": 1448693947777,
    "labels": ["Matrixes"],
  },
  {
    "id": "minesweeper",
    "name": "Minesweeper",
    "title": "Find all those bombs",
    "desc": "lorem ipsum lorem ipsum lorem ipsum",
    "url": "projs/minesweeper",
    "publishedAt": 1448693947777,
    "labels": ["Matrixes"],
  },
  {
    "id": "minesweeper",
    "name": "Minesweeper",
    "title": "Find all those bombs",
    "desc": "lorem ipsum lorem ipsum lorem ipsum",
    "url": "projs/minesweeper",
    "publishedAt": 1448693947777,
    "labels": ["Matrixes"],
  },
  {
    "id": "minesweeper",
    "name": "Minesweeper",
    "title": "Find all those bombs",
    "desc": "lorem ipsum lorem ipsum lorem ipsum",
    "url": "projs/minesweeper",
    "publishedAt": 1448693947777,
    "labels": ["Matrixes"],
  },
  {
    "id": "minesweeper",
    "name": "Minesweeper",
    "title": "Find all those bombs",
    "desc": "lorem ipsum lorem ipsum lorem ipsum",
    "url": "projs/minesweeper",
    "publishedAt": 1448693947777,
    "labels": ["Matrixes"],
  }];



  $(document).ready(initPage);

function initPage() {
    renderModals();
    renderProjs();
}


  function renderModals() {
               gProjs.forEach(function (proj, idx) {
                var strHtml = ''
                var selector = '#portfolioModal' + (idx + 1) + ' div.modal-body';


            strHtml += 
                `<h2>${proj.name}</h2>
                <p class="item-intro text-muted">${proj.title}</p>
                <img class="img-fluid d-block mx-auto" src="img/portfolio/0${idx + 1}-full.jpg" alt=""> 
                <p class="description">${proj.desc}</p>
                <ul class="list-inline">
                <li>Date published: ${proj.publishedAt}</li> 
                <li>Category: ${proj.labels}</li> 
                </ul>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                <i class="fa fa-times"></i>
                Close Project</button>`;
                $(selector).html(strHtml);
            });
    }


  function renderProjs() {
    var strHtml = '';
    var selector = '#portfolio-cont';

    gProjs.forEach(function (proj, idx) {
        strHtml += 
            `<div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${idx + 1}">
              <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                  <i class="fa fa-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid" src="img/portfolio/0${idx + 1}-thumbnail.jpg" alt="">
            </a>
            <div class="portfolio-caption">
              <h4>${proj.name}</h4>
              <p class="text-muted">${proj.labels}</p>
            </div>
          </div>`

          $(selector).html(strHtml);
        });
  }

  var data = [
    {
        name: "bootstrap-table",
        stargazers_count: "526",
        forks_count: "122",
        description: "An extended Bootstrap table with radio, checkbox, sort, pagination, and other added features. (supports twitter bootstrap v2 and v3) "
    },
    {
        name: "multiple-select",
        stargazers_count: "288",
        forks_count: "150",
        description: "A jQuery plugin to select multiple elements with checkboxes :)"
    },
    {
        name: "bootstrap-show-password",
        stargazers_count: "32",
        forks_count: "11",
        description: "Show/hide password plugin for twitter bootstrap."
    },
    {
        name: "blog",
        stargazers_count: "13",
        forks_count: "4",
        description: "my blog"
    },
    {
        name: "scutech-redmine",
        stargazers_count: "6",
        forks_count: "3",
        description: "Redmine notification tools for chrome extension."
    },
    {
        name: "scutech-redmine1",
        stargazers_count: "6",
        forks_count: "3",
        description: "Redmine notification tools for chrome extension."
    }
];

function nameFormatter(value) {
    return '<a href="https://github.com/wenzhixin/' + value + '">' + value + '</a>';
}

function starsFormatter(value) {
    return '<i class="glyphicon glyphicon-star"></i> ' + value;
}

function forksFormatter(value) {
    return '<i class="glyphicon glyphicon-cutlery"></i> ' + value;
}

$(function () {
    $('#table').bootstrapTable({
        data: data
    });
});