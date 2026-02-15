
export const usehandleDeleteWithPagination = () => {
    const handleDelete = async (id, deleteFunction, responseFunction, page, setPage, data) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?')
        if (!isConfirmed) return
        try {
            await deleteFunction(id)
            // if the last item on the current page is deleted, move to the previous page
            const remainingItemsOnPage = data.length - 1
            if (remainingItemsOnPage === 0 && page > 1) {
                setPage(page - 1)
            } else {
                await responseFunction(page)
            }
        } catch (error) {
            console.log('Error on deleting item', error)
        }
    }
    return { deleteById: handleDelete }
}

