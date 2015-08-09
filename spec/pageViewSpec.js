describe('test pageView', function () {
    beforeEach(function () {
        var fixtures = " <ul class=\"season seasons-slider\">" +
            "<li class=\"spring season-active-slide\"></li>" +
            "<li class=\"spring season-active-slide\"></li>" +
            "<li class=\"spring season-active-slide\"></li>" +
            "<li class=\"spring season-active-slide\"></li>";
        setFixtures(fixtures);
    });

    it('should create a link to different season', function () {
        Generator.createSliderPagination($('.seasons-slider'));
        expect($('.season-slider-pagination >li').hasClass('season-active')).toBe(true);
    });
});
