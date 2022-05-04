$(document).ready(function() {
    let status = 'not_loaded_news';

    function splitNewsArrayIntoPages(elements, elementsIntoPage) {
        const res = [];
        for (let i = 0; i < elements.length; i += elementsIntoPage) {
            const chunk = elements.slice(i, i + elementsIntoPage);
            res.push(chunk);
        }
        return res;
    }

    function showNewsOnWidget(newsParam) {
        $('.news-list').empty();
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

    function getNewsFromAPI(url, method) {
        // GET THE NEWS FROM THE API
        $.ajax({
            type: method,
            url: url,
            dataType: "json",
            success: function(data) {
                news.pages = splitNewsArrayIntoPages(data.news, 5);
                showNewsOnWidget(news.pages[paginaCurenta - 1]);
                renderDotsOnWidget(news.pages.length);
                if (data.length > 0) {
                    status = 'loaded_news'
                }
            },
            error: function(errormessage) {
                console.log(errormessage);
            }
        });

    }

    //definirea paginii curente
    let paginaCurenta = 1;

    let news = {
        pages: undefined
    };

    getNewsFromAPI("http://www.mocky.io/v2/58fda6ce0f0000c40908b8c8", "GET");

    $(document).on('click', '.wtr_dot', function(e) {
        // eliminare clase active de pe celelalte elemente
        $('.wtr_dot.dot-active').removeClass('dot-active')

        // setare clasa activa
        $(e.currentTarget).addClass('dot-active')
        paginaCurenta = parseInt($(e.currentTarget).attr('data-pagina-id'));
        showNewsOnWidget(news.pages[paginaCurenta - 1]);
    })

    setTimeout(() => {
        getNewsFromAPI();
    }, 18000);

    setInterval(function() {
        if (paginaCurenta < news.pages.length) {
            paginaCurenta = paginaCurenta + 1;

        } else if (paginaCurenta == news.pages.length) {
            paginaCurenta = 1;
        }

        $($($('.wtr_dot.dot-active')[0])).removeClass('dot-active');
        $($(`.wtr_dot[data-pagina-id=${paginaCurenta}]`)[0]).addClass('dot-active');
        showNewsOnWidget(news.pages[paginaCurenta - 1])


    }, 15000);
});