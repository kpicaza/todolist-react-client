function FormDataFactory() {
}

FormDataFactory.prototype = {
    create: function () {
        return new FormData();
    }
};

export default FormDataFactory;
