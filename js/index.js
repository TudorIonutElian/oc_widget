$(document).ready(function() {

    function splitNewsArrayIntoPages(elements, elementsIntoPage) {
        const res = [];
        for (let i = 0; i < elements.length; i += elementsIntoPage) {
            const chunk = elements.slice(i, i + elementsIntoPage);
            res.push(chunk);
        }
        return res;
    }

    function showNewsOnWidget(newsParam) {
        [...newsParam].forEach(newsElement => {
            let html = `<div class="news">
                            <div class="news_title">
                                ${newsElement.title}
                            </div>
                            <div class="news_url">
                                ${newsElement.details}
                            </div>
                        </div>`;
            $('.news-list').append(html)
        });
    }

    function renderDotsOnWidget(newsPages) {
        for (let i = 0; i < newsPages; i++) {
            let urlDot = '';
            if (i == 0) {
                urlDot = `<a href="#" class="wtr_dot dot-active" data-pagina-id=${i+1}></a>`;
            } else {
                urlDot = `<a href="#" class="wtr_dot" data-pagina-id=${i+1}></a>`;
            }
            $('.right-dots').append(urlDot);
        }
    }

    //definirea paginii curente
    let paginaCurenta = 1;

    let news = {
        pages: undefined
    };

    let errors = [];

    // GET THE NEWS FROM THE API
    $.ajax({
        type: "GET",
        url: "http://www.mocky.io/v2/58fda6ce0f0000c40908b8c8",
        dataType: "json",
        success: function(data) {
            news.pages = splitNewsArrayIntoPages(data.news, 5);
            showNewsOnWidget(news.pages[paginaCurenta - 1]);
            renderDotsOnWidget(news.pages.length)
        },
        error: function(errormessage) {
            console.log(errormessage);
        }
    });



});