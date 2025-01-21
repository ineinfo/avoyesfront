


// /////////// search popup //////////////////
document.getElementById('search-input').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const query = this.value.trim();
    if (query) {
      // Redirect to the desired page with the search query, e.g., search results page
      window.location.href = `/Market-Place.html?query=${encodeURIComponent(query)}`;
    }
  }
});
///////////////header search icon pop up js//////////////////////////////

document.getElementById('search-icon').addEventListener('click', function (event) {
  event.preventDefault();
  document.getElementById('search-popup').style.display = 'block';
});

document.getElementById('close-popup').addEventListener('click', function () {
  document.getElementById('search-popup').style.display = 'none';
});

window.addEventListener('click', function (event) {
  if (event.target == document.getElementById('search-popup')) {
    document.getElementById('search-popup').style.display = 'none';
  }
});
/////////////////////////// events js /////////////////////////////////////////////
$(document).ready(function () {
  $('.events').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: false,  // Disable dots
    autoplay: false,  // Enable autoplay
    autoplaySpeed: 1000,  // Set autoplay speed (in milliseconds)
    prevArrow: <button type="button" className="slick-prev" aria-label="Previous"><span aria-hidden="true">&lsaquo;</span></button>,
    nextArrow: <button type="button" className="slick-next" aria-label="Next"><span aria-hidden="true">&rsaquo;</span></button>,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
});
/////////////////////////// Related product js /////////////////////////////////////////////
$(document).ready(function () {
  $('.related-product').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,  // Disable dots
    autoplay: true,  // Enable autoplay
    autoplaySpeed: 1000,  // Set autoplay speed (in milliseconds)
    // prevArrow: '<button type="button" className="slick-prev" aria-label="Previous"><span aria-hidden="true">&lsaquo;</span></button>',
    // nextArrow: '<button type="button" className="slick-next" aria-label="Next"><span aria-hidden="true">&rsaquo;</span></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
});

/////////////////////////////////////// market place ////////////////////////////////
$(document).ready(function () {
  $('.market-place').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: false,  // Disable dots
    autoplay: false,  // Enable autoplay
    autoplaySpeed: 1000,  // Set autoplay speed (in milliseconds)
    // prevArrow: '<button type="button" className="slick-prev" aria-label="Previous"><span aria-hidden="true">&lsaquo;</span></button>',
    // nextArrow: '<button type="button" className="slick-next" aria-label="Next"><span aria-hidden="true">&rsaquo;</span></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
});

/////////////drpdwn sorting///////////////////////////

// Event listener for the "Showing" dropdown
document.querySelectorAll('.drp-showing-option').forEach(function (element) {
  element.addEventListener('click', function (event) {
    event.preventDefault();
    const selectedValue = this.getAttribute('data-value');
    document.getElementById('showingOption').innerText = selectedValue;
  });
});

// Event listener for the "Sorting" dropdown
document.querySelectorAll('.drp-sorting-option').forEach(function (element) {
  element.addEventListener('click', function (event) {
    event.preventDefault();
    const selectedText = this.innerText;
    document.getElementById('sortingOption').innerText = selectedText;
  });
});

// ///////////// filter 
$(document).ready(function () {
  $('.tab').on('click', function () {
    var tabId = $(this).data('tab');
    $('.tab').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').removeClass('active');
    $('#tab-' + tabId).addClass('active');
  });
});


/////////////////////////////////product details image change
function changeImage(imageSrc) {
  document.getElementById('mainImage').src = imageSrc;
}
document.addEventListener('DOMContentLoaded', function () {
  // Zoom Functionality
  function changeImage(imageSrc) {
    const mainImage = document.getElementById('mainImage');
    const zoomBox = document.getElementById('zoomBox');

    if (mainImage && zoomBox) {
      mainImage.src = imageSrc;
      zoomBox.style.backgroundImage = `url(${imageSrc})`;
    }
  }

  const mainImage = document.getElementById('mainImage');
  const zoomBox = document.createElement('div');
  zoomBox.id = 'zoomBox';

  const container = document.querySelector('.col-9');
  if (container) {
    container.appendChild(zoomBox);
  } else {
    console.error("Element with className 'col-9' not found.");
  }

  if (mainImage) {
    mainImage.addEventListener('mousemove', function (event) {
      const zoomLevel = 2.5;
      const rect = mainImage.getBoundingClientRect();
      const x = event.clientX - rect.left; // X position within the image
      const y = event.clientY - rect.top;  // Y position within the image
      const backgroundPosX = (x / mainImage.offsetWidth) * 100;
      const backgroundPosY = (y / mainImage.offsetHeight) * 100;

      zoomBox.style.backgroundImage = `url(${mainImage.src})`;
      zoomBox.style.backgroundPosition = `${backgroundPosX}% ${backgroundPosY}%`;
      zoomBox.style.display = 'block';
    });

    mainImage.addEventListener('mouseleave', function () {
      zoomBox.style.display = 'none';
    });
  } else {
    console.error("Element with id 'mainImage' not found.");
  }

  // jQuery Quantity Increment/Decrement
  $(document).ready(function () {
    var buttonPlus = $(".qty-btn-plus");
    var buttonMinus = $(".qty-btn-minus");

    buttonPlus.click(function () {
      var $n = $(this).parent(".qty-container").find(".input-qty");
      $n.val(Number($n.val()) + 1);
    });

    buttonMinus.click(function () {
      var $n = $(this).parent(".qty-container").find(".input-qty");
      var amount = Number($n.val());
      if (amount > 0) {
        $n.val(amount - 1);
      }
    });
  });
});

///////////////////////////////////////size selection product details
function setActive(button) {
  const buttons = document.querySelectorAll('.size-btn');
  buttons.forEach(btn => btn.classNameList.remove('active'));
  button.classNameList.add('active');
}

///////////////////////////////cart counter
let counter = 1;

function updateCounterDisplay() {
  document.getElementById('counter').textContent = counter;
}

function incrementCounter() {
  counter++;
  updateCounterDisplay();
}

function decrementCounter() {
  if (counter > 0) { // Optional: Prevent counter from going below zero
    counter--;
    updateCounterDisplay();
  }
}

//   sidebar increment decrement quantity
$(document).ready(function () {
  const minus = $('.quantity__minus');
  const plus = $('.quantity__plus');
  const input = $('.quantity__input');
  minus.click(function (e) {
    e.preventDefault();
    var value = input.val();
    if (value > 1) {
      value--;
    }
    input.val(value);
  });

  plus.click(function (e) {
    e.preventDefault();
    var value = input.val();
    value++;
    input.val(value);
  })
});
///////////////////////////////////////////
$(document).ready(function () {
  const minus = $('.quantity__minus-2');
  const plus = $('.quantity__plus-2');
  const input = $('.quantity__input-2');
  minus.click(function (e) {
    e.preventDefault();
    var value = input.val();
    if (value > 1) {
      value--;
    }
    input.val(value);
  });

  plus.click(function (e) {
    e.preventDefault();
    var value = input.val();
    value++;
    input.val(value);
  })
});
//   ////////////////////////////////// cart page counter //////////////////////////////////////

// var buttonPlus  = $(".qty-btn-plus");
// var buttonMinus = $(".qty-btn-minus");

// var incrementPlus = buttonPlus.click(function() {
//   var $n = $(this)
//   .parent(".qty-container")
//   .find(".input-qty");
//   $n.val(Number($n.val())+1 );
// });

// var incrementMinus = buttonMinus.click(function() {
//   var $n = $(this)
//   .parent(".qty-container")
//   .find(".input-qty");
//   var amount = Number($n.val());
//   if (amount > 0) {
//     $n.val(amount-1);
//   }
// });

// //////////////// modal hover open map page ///////////
// document.querySelectorAll('.map-head').forEach(function(element) {
//     element.addEventListener('mouseenter', function() {
//         var modal = new bootstrap.Modal(document.getElementById('mapmodal'));
//         modal.show();
//     });
// });


//////////////////choose color box effect
document.querySelectorAll('.choose-color-boxes a').forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior

    // Remove the 'selected-color' className from all color boxes
    document.querySelectorAll('.choose-color-boxes div').forEach(box => {
      box.classNameList.remove('selected-color');
    });

    // Add the 'selected-color' className to the clicked color box
    this.querySelector('div').classNameList.add('selected-color');
  });
});

////////////////////// star rating clicking ////////////
var $star_rating = $('.star-rating .fa');

var SetRatingStar = function () {
  return $star_rating.each(function () {
    if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
      return $(this).removeClass('fa-star-o').addClass('fa-star');
    } else {
      return $(this).removeClass('fa-star').addClass('fa-star-o');
    }
  });
};

$star_rating.on('click', function () {
  $star_rating.siblings('input.rating-value').val($(this).data('rating'));
  return SetRatingStar();
});

SetRatingStar();
$(document).ready(function () {

});

///////////////////// img popup thumbnails
document.addEventListener('DOMContentLoaded', function () {
  window.changeImage = function (imageSrc, targetId) { // Accept the target image ID as a parameter
    const mainImage = document.getElementById(targetId); // Dynamically get the correct main image element
    if (mainImage) {
      mainImage.src = imageSrc;
    } else {
      console.error(`Element with id '${targetId}' not found.`);
    }
  };

  // You can add any other additional functionality (zoom, jQuery, etc.) below
});

/////////////////// checkout page dropdown ////////////////////////
function updateDropdownLabel(dropdownMenu) {
  const items = dropdownMenu.querySelectorAll('.dropdown-item');
  const button = dropdownMenu.previousElementSibling;

  items.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      button.innerHTML = this.getAttribute('data-value') + ' <i className="fa fa-chevron-down ms-2"></i>';
    });
  });
}

// Initialize for each dropdown
document.querySelectorAll('.dropdown').forEach(dropdown => {
  updateDropdownLabel(dropdown.querySelector('.city-menu'));
});

document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('#customCarousel');
  let startX = 0;
  let endX = 0;

  // For touch devices (mobile)
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', (e) => {
    handleSwipe();
  });

  // For mouse drag on desktop
  carousel.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    e.preventDefault(); // Prevent default to allow drag
  });

  carousel.addEventListener('mouseup', (e) => {
    endX = e.clientX;
    handleSwipe();
  });

  // Handle swipe/drag function
  function handleSwipe() {
    if (startX - endX > 40) {
      // Swipe/drag left - go to the next slide
      bootstrap.Carousel.getInstance(carousel).next();
    } else if (endX - startX > 40) {
      // Swipe/drag right - go to the previous slide
      bootstrap.Carousel.getInstance(carousel).prev();
    }
    // Reset values
    startX = 0;
    endX = 0;
  }
});
// JavaScript to toggle between address list and form
// Handle the click event for the 'Add New Address' button
document.getElementById('addNewAddressBtn').addEventListener('click', function () {
  document.getElementById('addressList').style.display = 'none';  // Hide address list
  document.getElementById('addressForm').style.display = 'block';  // Show address form
  document.getElementById('addNewAddressBtn').style.display = 'none';  // Hide 'Add New' button
  document.getElementById('backToAddressListBtn').style.display = 'inline-block';  // Show 'Back' button
});

// Handle the click event for the 'Back to Address List' button
document.getElementById('backToAddressListBtn').addEventListener('click', function () {
  document.getElementById('addressList').style.display = 'block';  // Show address list
  document.getElementById('addressForm').style.display = 'none';  // Hide address form
  document.getElementById('addNewAddressBtn').style.display = 'inline-block';  // Show 'Add New' button
  document.getElementById('backToAddressListBtn').style.display = 'none';  // Hide 'Back' button
});

// Handle the click event for the 'Edit' icon
document.querySelectorAll('.fas.fa-edit').forEach(function (editButton) {
  editButton.addEventListener('click', function () {
    document.getElementById('addressList').style.display = 'none';  // Hide address list
    document.getElementById('addressForm').style.display = 'block';  // Show address form
    document.getElementById('addNewAddressBtn').style.display = 'none';  // Hide 'Add New' button
    document.getElementById('backToAddressListBtn').style.display = 'inline-block';  // Show 'Back' button
  });
});


  // dhara
  // Popper.js (required for Bootstrap features like tooltips, popovers, and dropdowns)
  const popperScript = document.createElement('script');
  popperScript.src = "https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js";
  document.head.appendChild(popperScript);

  const bootstrapScript = document.createElement('script');
  bootstrapScript.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.min.js";
  document.head.appendChild(bootstrapScript);

