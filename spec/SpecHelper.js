beforeEach(function () {
    jasmine.addMatchers({
        "toBeInstanceOf" : function () {
            return {
                compare : function(actual, expected) {
                    return {
                        "pass" : actual instanceof expected
                    };
                }
            };
        }
    });
});
