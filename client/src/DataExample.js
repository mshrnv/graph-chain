const DataExample = {
    nodes: [
        {
            id: 'Как заботать Python?',
            description: "",
            url: "",
            isRoot: true,
            isFolder: true,
            x: 500,
            y: 50
        },
        {
            id: 'Основы Python',
            description: "",
            isRoot: false,
            isFolder: true,
            x: 250,
            y: 150,
        },
        {
            id: 'ООП в Python',
            description: "",
            isRoot: false,
            isFolder: true,
            x: 500,
            y: 150,
        },
        {
            id: 'Выбор и изучение фреймворка',
            description: "",
            isRoot: false,
            isFolder: true,
            x: 750,
            y: 150,
        },
        {
            id: 'Циклы в Python',
            description: "",
            url: "",
            isRoot: false,
            isFolder: false,
            x: 75,
            y: 250
        },
        {
            id: 'Условные операторы',
            description: "",
            url: "",
            isRoot: false,
            isFolder: false,
            x: 250,
            y: 250
        },
        {
            id: 'Функции в Python',
            description: "",
            url: "",
            isRoot: false,
            isFolder: false,
            x: 425,
            y: 250
        },
    ],
    links: [
        {source: 'Как заботать Python?', target: 'Основы Python'},
        {source: 'Как заботать Python?', target: 'ООП в Python'},
        {source: 'Как заботать Python?', target: 'Выбор и изучение фреймворка'},
        {source: 'Основы Python', target: 'Циклы в Python'},
        {source: 'Основы Python', target: 'Условные операторы'},
        {source: 'Основы Python', target: 'Функции в Python'},
    ]
};

export default DataExample;