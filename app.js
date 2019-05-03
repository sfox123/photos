
$(document).ready(function () {
  $.getJSON('/api')
    .then(add)

})

$(document).ready(function () {
  $('#nav-toggler').on('click', function () {
    $('.sidebar').toggleClass('display');
  })
})

function add(data) {
  data.forEach(function (test) {
    var id = test._id;
    var Add = test.name;
    var img = test.image;
    var price = test.price;
    var mprice = test.mprice;
    var diff = mprice - price;
    $('#shop').append('<div class="col-sm-4 col-md-3">' + '<div class="card">' + '<img src="' + img + '" alt="chilli" class="card-img-top">' + '<div class="card-body">' + '<a href="/product/' + id + '">' + '<h5 class="card-title">' + Add + '</a>' + '<span class="text-right ml-4">' + price + '.rs' + '</span>' + '</h5>' + '<a href="#" class="btn btn-outline-success btn-small mr-4 mb-3 px-4">' + 'Buy' + '</a>' + '<a href="#" class="btn btn-outline-danger btn-small mb-3">' + '<i class="fa fa-shopping-cart">' + '</i>' + '</a>' + '<footer class="blockquote-footer">' + 'Market Price - ' + '<s>' + mprice + '</s>' + '<cite class=" ml-4">' + 'Save ' + diff + '</cite>' + '</footer>' + '</div>' + '</div>' + '</div>');

  })
}

$(document).on('click', '#plus', function (e) {
  e.preventDefault();
  var priceValue = parseFloat($('#priceValue').val());
  var quantity = parseInt($('#quantity').val());

  priceValue += parseFloat($('#priceHidden').val());
  quantity += 1;

  $('#quantity').val(quantity);
  $('#priceValue').val(priceValue.toFixed(2));
  $('#priceShow').text(priceValue.toFixed(2));
  $('#total').html(quantity);
});


$(document).on('click', '#minus', function (e) {
  e.preventDefault();
  var priceValue = parseFloat($('#priceValue').val());
  var quantity = parseInt($('#quantity').val());

  if (quantity == 1) {
    priceValue = $('#priceHidden').val();
    quantity = 1;
  } else {
    priceValue -= parseFloat($('#priceHidden').val());
    quantity -= 1;
  }

  $('#quantity').val(quantity);
  $('#priceValue').val(priceValue.toFixed(2));
  $('#priceShow').text(priceValue.toFixed(2));
  $('#total').html(quantity);
});


$(document).ready(function () {
  $(document).on('click', '.side-nav__item', function () {
    $("#list_1").removeClass('side-nav__item--active');
    $(".side-nav__item--active").toggleClass('side-nav__item--active');
    $(this).toggleClass('side-nav__item--active');
  });
});

var showResults = debounce(function (arg) {

  var value = arg.trim();
  if (escapeRegex(value) == '' || value.length <= 0) {
    $('#search-results').fadeOut();
    return;
  } else {
    $('#search-results').fadeIn();
  };
  var jqxhr = $.get('/search?q=' + escapeRegex(value), function (data) {
      $('#search-results').html('');
    })
    .done(function (data) {
      if (data.length === 0) {
        $('#search-results').append("<p class=\"search--para\">No Results</p>");
      } else {
        data.forEach(x => {
          $('#search-results').append("<a class=\"search--link\" href=/product/" + x._id + ">  <p class=\"search--para\">" + x.name + "<p> </a>");
        });
      }
    })
    .fail(function (err) {
      console.log(err);
    })
}, 200);


$(document).ready(function () {
  $(document).on('click', '#down', function () {
    $("#cta").removeClass('hidden');
  });
});

$(document).ready(function () {
  $(document).on('click', '.side-nav__link', function () {
    $("#hidden").addClass('hidden');
  })
})
$(document).ready(function () {
  $(document).on('click', '#btn', function () {
    $("#popup").removeClass('hidden');
  })
})



function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

function limitText(limitField, limitNum) {
  if (limitField.value.length > limitNum) {
    limitField.value = limitField.value.substring(0, limitNum);
  }
}

function limitNumber(limitField, limitNum) {
  if (limitField.value.length > limitNum) {
    limitField.value = limitField.value.subinteger(0, limitNum);
  }
}

$('#re-password').on('keyup', function () {
  if ($('#password').val() == $('#re-password').val()) {
    $('#match').html('Matching').css('color', 'green');
    $('#enabled').removeClass('hidden');

  } else {
    $('#match').html('Not Matching').css('color', 'red');
  }
});

$('.side-nav__icon_eye').on('click', function () {
  $('#svg').attr("xlink:href", "/images/sprite_2.svg#icon-eye");
  $('#password').attr('type', 'text');
})


function alerted() {
  Swal.fire({
    title: 'Goods Will Be At Your Door Steps ASAP :)',
    width: 600,
    fontWeight: '100',
    padding: '3em',
    background: '#fff url(https://sweetalert2.github.io/#native_link#images/trees.png)',
    backdrop: `
      rgba(0,0,123,0.4)
      url("/images/success.gif")
      center left
      no-repeat
    `
  })
}

function info(){
  Swal.fire({
  type: 'info',
  title: 'Contact Us',
  text: '077 200 8484 , 076 095 0419 , 076 095 0420',
  footer: "<p>Email  : </p> <a href ='mailo:no-one@snai1mai1.com' style='font-size:1.2rem; text-decoration:none;color:#000'>getitanything@gmail.com</a>"
})
}

function about(){
  Swal.fire({
  type: 'info',
  title: 'About Us',
  text: 'Getit.lk is an Online Wholesale Retail Company, Linking Wholesale Suppliers with Retail Customers to obtain Best Price and Quality',
  footer: "<p>Email  : </p> <a href ='mailo:no-one@snai1mai1.com' style='font-size:1.2rem; text-decoration:none;color:#000'>getitanything@gmail.com</a>"
})
}

function debounce(func, await, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, await);
    if (callNow) func.apply(context, args);
  }
}

const deleteProduct = (btn) => {
  let name = btn.parentNode.querySelector('[name=item]').value;
  let price = btn.parentNode.querySelector('[name=price]').value;
  let quantity = btn.parentNode.querySelector('[name=quantity]').value;
  let span = document.getElementById('total').textContent;
  let cart = document.querySelector('.user-nav__notification').textContent;
  
  let val = parseInt(btn.parentNode.querySelector('.span_price').textContent);
  let value = parseInt(price) * parseInt(quantity);
  let tot = document.querySelector('#total').textContent;
  let proElement = btn.closest('article');

  proElement.remove();

  cart != 1 ? document.querySelector('.user-nav__notification').textContent = cart - 1 :
  document.querySelector('.user-nav__notification').textContent = 0;

  span <= val ? document.getElementById('sub_total').textContent = 'Cart is Empty' :
  document.getElementById('total').textContent = parseInt(tot) - parseInt(val);

  span == val ? document.querySelector('#btn').classList.add('hidden') : console.log('');

  fetch('/remove/' + name + '/' + value + "", {
      method: 'post'
    }).then(result => {
      return result.json()
    })
    .catch(err => {
      console.log(err);
    })
}



const addCart = (btn) => {

  let id = btn.parentNode.querySelector('[name=id]').value;
  let name = btn.parentNode.querySelector('[name=name]').value;
  let price = btn.parentNode.querySelector('[name=price]').value;
  let quantity = btn.parentNode.querySelector('.valued').textContent;
  let unit = btn.parentNode.querySelector('[name=unit]').value;
  let cart = document.querySelector('.user-nav__notification').textContent;
  
  let tot = parseInt(cart) + 1 ;
  
  cart == 0 ? document.querySelector('.user-nav__notification').textContent = 1 
  : document.querySelector('.user-nav__notification').textContent = tot ;
  btn.parentNode.querySelector('.valued').textContent = 1;
  btn.parentNode.querySelector('.btn__visible-1').textContent = 'Added to Cart';
  setTimeout(() => {
      btn.parentNode.querySelector('.btn__visible-1').textContent = 'Add to Cart';
  }, 1500);


  fetch('/add_cart/' + id + "/" + name + "/" + price + "/" + quantity + "/" + unit + "", {
    method: 'post'
  }).then(result => {
    return result.json()
  }).catch(err => {
    console.log(err);
  })

}


const plus = (btn) => {
  let price = btn.parentNode.querySelector('.valued').textContent;
  price >= 19 ? btn.parentNode.querySelector('.valued').textContent = 20 : 
  btn.parentNode.querySelector('.valued').textContent++;
}

const sub = (btn) => {
  let price = btn.parentNode.querySelector('.valued').textContent;
  price <= 1 ? btn.parentNode.querySelector('.valued').textContent = 1 :
  btn.parentNode.querySelector('.valued').textContent--;
}

const cart_plus = (btn) => {
  let tot = document.querySelector('#total').textContent;
  let price = btn.parentNode.querySelector('[name=price]').value;
  // let id = btn.parentNode.querySelector('[name=id]').value;
  // let unit = btn.parentNode.querySelector('[name=unit]').value;
  // let name = btn.parentNode.querySelector('[name=item]').value;
  let quantity = btn.parentNode.querySelector('.valued').textContent;
  let comp = parseInt(tot) + parseInt(price);
  let sPrice = btn.parentNode.querySelector('.span_price').textContent;
  let sComp = parseInt(sPrice) + parseInt(price);
  quantity >= 19 ? btn.parentNode.querySelector('.valued').textContent = 20 : 
  btn.parentNode.querySelector('.valued').textContent++;

  if( btn.parentNode.querySelector('.cart_span').textContent >= 19){
    btn.parentNode.querySelector('.cart_span').textContent = 20;
    
  }else{
    btn.parentNode.querySelector('.cart_span').textContent++;
    document.querySelector('#total').textContent = comp;
    btn.parentNode.querySelector('.span_price').textContent = sComp; 
  }

    // fetch('/cart_plus/' + name + '/' + sComp + '/' + unit + "/" + id + "/" + price + "/" + quantity + "/" + "", {
    //   method: 'post'
    // }).then(result => {
    //   return result.json()
    // })
    // .catch(err => {
    //   console.log(err);
    // })
}


const cart_sub = (btn) => {
  let tot = document.querySelector('#total').textContent;
  let price = document.querySelector('[name=price]').value;
  let quantity = btn.parentNode.querySelector('.valued').textContent;
  let comp = parseInt(tot) - parseInt(price);
  let sPrice = btn.parentNode.querySelector('.span_price').textContent;
  let sComp = parseInt(sPrice) - parseInt(price);

  quantity <= 1 ? btn.parentNode.querySelector('.valued').textContent = 1 : 
  btn.parentNode.querySelector('.valued').textContent--;

  if( btn.parentNode.querySelector('.cart_span').textContent <= 1){
    btn.parentNode.querySelector('.cart_span').textContent = 1;
        btn.parentNode.querySelector('.span_price').textContent = price; 
    
  }else{
    btn.parentNode.querySelector('.cart_span').textContent--;
    document.querySelector('#total').textContent = comp;
    btn.parentNode.querySelector('.span_price').textContent = sComp; 
  }
}

