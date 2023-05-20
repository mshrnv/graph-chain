import requests
from bs4 import BeautifulSoup


def parse_github_post(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
    except requests.exceptions.RequestException:
        return None

    soup = BeautifulSoup(response.content, 'html.parser')
    stat_elem = soup.find('div', {'class': 'Layout-sidebar'})

    return parse_github_info(str(stat_elem), url)


def parse_github_info(html_str, url):
    soup = BeautifulSoup(html_str, 'html.parser')

    github_info = {
        "name": None,
        "stars": 0,
        "url": str(url),
        "languages": None
    }
    try:
        name = soup.find('p', class_='f4 my-3').text.strip()

        path = url.split('//')[-1].split('/', 1)[-1]
        stars = soup.find('a', href='/' + path + '/stargazers').strong.text.strip()
        forks = soup.find('a', href='/' + path + '/forks').strong.text.strip()
        watching = soup.find('a', href='/' + path + '/watchers').strong.text.strip()

        languages = []
        language_items = soup.find_all('a', href=lambda href: href and '/search?l=' in href)
        for language_item in language_items:
            language = language_item.text.strip()
            languages.append(language.split('\n')[0])

        tags = []
        tag_items = soup.find_all('a', class_='topic-tag')
        for tag_item in tag_items:
            tags.append(tag_item.text.strip())

        github_info = {
            "name": name,
            "stars": stars,
            "url": str(url),
            "languages": tuple(languages)
        }


    except:
        return None

    if github_info['name'] is not None:
        return github_info
    else:
        return None