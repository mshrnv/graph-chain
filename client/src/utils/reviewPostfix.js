const reviewPostfix = (count) => {
    if (count === 0 || count >= 5)
        return 'отзывов'

    if (count === 1)
        return 'отзыв'

    return 'отзыва'
}

export default reviewPostfix;