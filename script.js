$(document).ready(function() {
    // Initialize the datepicker
    $("#date").datepicker({
        dateFormat: "dd-mm-yy",
        changeMonth: true,
        changeYear: true,
        yearRange: "1900:2100",
        onSelect: function(dateText) {
            var date = $(this).datepicker('getDate');
            $('#day').val(date.getDate());
            $('#month').val(date.getMonth() + 1); // Months are zero-based
            $('#year').val(date.getFullYear());
        }
    });

    // Dark mode toggle
    $('#darkModeToggle').on('change', function() {
        if (this.checked) {
            $('body').addClass('dark-mode');
            $('.container').addClass('dark-mode');
            $('.icon.sun').hide();
            $('.icon.moon').show();
        } else {
            $('body').removeClass('dark-mode');
            $('.container').removeClass('dark-mode');
            $('.icon.sun').show();
            $('.icon.moon').hide();
        }
    });

    // Toggle input mode between calendar and manual
    $('#toggleInputMode').on('click', function() {
        var manualInputs = $('#manualInputs');
        var dateInput = $('#date');
        if (manualInputs.is(':visible')) {
            manualInputs.hide();
            dateInput.show();
            $(this).text('Switch to Manual Input');
        } else {
            manualInputs.show();
            dateInput.hide();
            $(this).text('Switch to Calendar Input');
        }
    });

    // Synchronize manual input fields with hidden date fields
    $('#manualDay, #manualMonth, #manualYear').on('change', function() {
        $('#day').val($('#manualDay').val());
        $('#month').val($('#manualMonth').val());
        $('#year').val($('#manualYear').val());
    });

    // Handle manual inputs for age calculation
    $('#manualDay, #manualMonth, #manualYear').on('input', function() {
        var day = parseInt($('#manualDay').val());
        var month = parseInt($('#manualMonth').val());
        var year = parseInt($('#manualYear').val());

        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
            $('#day').val(day);
            $('#month').val(month);
            $('#year').val(year);
        }
    });
});

function calculateAge() {
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    const result = document.getElementById('result');
    const error = document.getElementById('error');
    const detailedResult = document.getElementById('detailedResult');

    // Clear previous messages
    result.textContent = '';
    error.textContent = '';
    detailedResult.textContent = '';

    // Check if all fields are filled
    if (!day || !month || !year) {
        error.textContent = 'Please select or enter a date.';
        error.style.display = 'block';
        return;
    }

    // Validate the date
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    if (birthDate > today) {
        error.textContent = 'Please enter a valid date in the past.';
        error.style.display = 'block';
        return;
    }

    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    const d = today.getDate() - birthDate.getDate();

    if (m < 0 || (m === 0 && d < 0)) {
        age--;
    }

    // Calculate detailed age
    let months = m < 0 ? (12 + m) : m;
    let days = d < 0 ? (new Date(today.getFullYear(), today.getMonth(), 0).getDate() + d) : d;

    if (d < 0) {
        months--;
    }

    result.textContent = `Your age is: ${age} years`;
    detailedResult.textContent = `You are ${age} years, ${months} months, and ${days} days old.`;
    error.style.display = 'none';
}

// Created by HJD
