export const mockModel = (model, method, data) => {
    jest.spyOn(model, method).mockImplementation(() => {
        return Promise.resolve(data);
    });
};
