import json
from typing import List, Dict, Union, Optional


import requests
from bs4 import BeautifulSoup


def parse_vc_post(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f'Request Error: {e}')
        return None

    soup = BeautifulSoup(response.content, 'html.parser')
    post_dict = {
        'title': None,
        'author': None,
        'author_href': None,
        'post_href': str(url),
        'likes': 0
    }

    try:
        title_elem = soup.find('h1', {'class': 'content-title'})
        post_dict['title'] = title_elem.text.strip()

        auth_elem = soup.find('a', {'class': 'content-header-author__name'})
        if auth_elem is None:
            auth_elem = soup.find('div', {'class': 'content-header-author__name'})
            post_dict['author'] = auth_elem.text.strip()
        else:
            post_dict['author_href'] = auth_elem['href']
            post_dict['author'] = auth_elem.text.strip()


        like_elem = soup.find('vue', {'name': 'likes'})
        if like_elem:
            post_dict['likes'] = get_likes_count(str(like_elem))


    except:
        return None

    if post_dict['title'] is not None:
        return post_dict
    else:
        return None




def get_likes_count(html_string: str) -> int:
    try:
        soup = BeautifulSoup(html_string, 'html.parser')
        textarea_tag = soup.find('textarea', {'class': 'l-hidden'})
        json_str = textarea_tag.text.strip()
        data = json.loads(json_str)
        count_likes = int(data['likeData']['count_likes'])
        return count_likes
    except:
        return 0

def parse_links(html_string: str) -> List[str]:
    try:
        soup = BeautifulSoup(html_string, 'html.parser')
        links = []
        for a in soup.find_all('a'):
            links.append(a.get('href'))
        return links
    except:
        return []

def remove_links(html_string: str) -> str:
    try:
        soup = BeautifulSoup(html_string, 'html.parser')
        for a in soup.find_all('a'):
            a.extract()
        return str(soup)
    except:
        return html_string