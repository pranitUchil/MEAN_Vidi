(function () {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            var spinnerElement = document.getElementById('spinner');
            if (spinnerElement) {
                spinnerElement.classList.remove('show');
            }
        }, 1);
    };
    spinner();

    // Back to top button
    window.addEventListener('scroll', function () {
        var backToTopElement = document.querySelector('.back-to-top');
        if (window.pageYOffset > 300) {
            backToTopElement.style.display = 'block';
        } else {
            backToTopElement.style.display = 'none';
        }
    });

    var backToTopButton = document.querySelector('.back-to-top');
    backToTopButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return false;
    });

    // Sidebar Toggler
    var sidebarToggler = document.querySelector('.sidebar-toggler');
    sidebarToggler.addEventListener('click', function () {
        var sidebar = document.querySelector('.sidebar');
        var content = document.querySelector('.content');
        sidebar.classList.toggle('open');
        content.classList.toggle('open');
        return false;
    });

    // Progress Bar
    var progressBar = document.querySelector('.pg-bar');
    var progressHandler = function () {
        var progressBars = document.querySelectorAll('.progress .progress-bar');
        progressBars.forEach(function (progressBar) {
            progressBar.style.width = progressBar.getAttribute('aria-valuenow') + '%';
        });
    };
    var waypointOptions = { offset: '80%' };
    var waypoint = new Waypoint(progressBar, progressHandler, waypointOptions);

    // Calendar
    var calendar = document.getElementById('calender');
    if (calendar) {
        new Datepicker(calendar, {
            inline: true,
            format: 'L'
        });
    }

    // Testimonials carousel
    var testimonialCarousel = $(".testimonial-carousel");
    testimonialCarousel.owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
        nav: false
    });

    // Chart Global Color
    Chart.defaults.color = "#6C7293";
    Chart.defaults.borderColor = "#000000";

    // Worldwide Sales Chart
    var worldwideSalesChart = document.getElementById('worldwide-sales');
    if (worldwideSalesChart) {
        var worldwideSalesData = {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [
                {
                    label: "USA",
                    data: [15, 30, 55, 65, 60, 80, 95],
                    backgroundColor: "rgba(235, 22, 22, .7)"
                },
                {
                    label: "UK",
                    data: [8, 35, 40, 60, 70, 55, 75],
                    backgroundColor: "rgba(235, 22, 22, .5)"
                },
                {
                    label: "AU",
                    data: [12, 25, 45, 55, 65, 70, 60],
                    backgroundColor: "rgba(235, 22, 22, .3)"
                }
            ]
        };
        var worldwideSalesOptions = {
            responsive: true
        };
        new Chart(worldwideSalesChart, {
            type: "bar",
            data: worldwideSalesData,
            options: worldwideSalesOptions
        });
    }

    // Sales & Revenue Chart
    var salesRevenueChart = document.getElementById('salse-revenue');
    if (salesRevenueChart) {
        var salesRevenueData = {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [
                {
                    label: "Sales",
                    data: [15, 30, 55, 45, 70, 65, 85],
                    backgroundColor: "rgba(235, 22, 22, .7)",
                    fill: true
                },
                {
                    label: "Revenue",
                    data: [99, 135, 170, 130, 190, 180, 270],
                    backgroundColor: "rgba(235, 22, 22, .5)",
                    fill: true
                }
            ]
        };
        var salesRevenueOptions = {
            responsive: true
        };
        new Chart(salesRevenueChart, {
            type: "line",
            data: salesRevenueData,
            options: salesRevenueOptions
        });
    }

    // Single Line Chart
    var lineChart = document.getElementById('line-chart');
    if (lineChart) {
        var lineChartData = {
            labels: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
            datasets: [
                {
                    label: "Sales",
                    fill: false,
                    backgroundColor: "rgba(235, 22, 22, .7)",
                    data: [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15]
                }
            ]
        };
        var lineChartOptions = {
            responsive: true
        };
        new Chart(lineChart, {
            type: "line",
            data: lineChartData,
            options: lineChartOptions
        });
    }

    // Single Bar Chart
    var barChart = document.getElementById('bar-chart');
    if (barChart) {
        var barChartData = {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [
                {
                    backgroundColor: [
                        "rgba(235, 22, 22, .7)",
                        "rgba(235, 22, 22, .6)",
                        "rgba(235, 22, 22, .5)",
                        "rgba(235, 22, 22, .4)",
                        "rgba(235, 22, 22, .3)"
                    ],
                    data: [55, 49, 44, 24, 15]
                }
            ]
        };
        var barChartOptions = {
            responsive: true
        };
        new Chart(barChart, {
            type: "bar",
            data: barChartData,
            options: barChartOptions
        });
    }

    // Pie Chart
    var pieChart = document.getElementById('pie-chart');
    if (pieChart) {
        var pieChartData = {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [
                {
                    backgroundColor: [
                        "rgba(235, 22, 22, .7)",
                        "rgba(235, 22, 22, .6)",
                        "rgba(235, 22, 22, .5)",
                        "rgba(235, 22, 22, .4)",
                        "rgba(235, 22, 22, .3)"
                    ],
                    data: [55, 49, 44, 24, 15]
                }
            ]
        };
        var pieChartOptions = {
            responsive: true
        };
        new Chart(pieChart, {
            type: "pie",
            data: pieChartData,
            options: pieChartOptions
        });
    }

    // Doughnut Chart
    var doughnutChart = document.getElementById('doughnut-chart');
    if (doughnutChart) {
        var doughnutChartData = {
            labels: ["Italy", "France", "Spain", "USA", "Argentina"],
            datasets: [
                {
                    backgroundColor: [
                        "rgba(235, 22, 22, .7)",
                        "rgba(235, 22, 22, .6)",
                        "rgba(235, 22, 22, .5)",
                        "rgba(235, 22, 22, .4)",
                        "rgba(235, 22, 22, .3)"
                    ],
                    data: [55, 49, 44, 24, 15]
                }
            ]
        };
        var doughnutChartOptions = {
            responsive: true
        };
        new Chart(doughnutChart, {
            type: "doughnut",
            data: doughnutChartData,
            options: doughnutChartOptions
        });
    }
})();
