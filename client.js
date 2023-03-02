$(document).ready(function() {
  // Listen event listener
  $('form').submit(function(event) {
    event.preventDefault();

    // Get input values
    var name = $('#name').val();
    var description = $('#description').val();
    var quantity = $('#quantity').val();

    // Send POST request with ajax
    $.ajax({
      method: 'POST',
      url: '/inventory',
      data: { name: name, description: description, quantity: quantity },
      success: function() {
        // Refresh inventory list
        $.ajax({
          method: 'GET',
          url: '/inventory',
          success: function(inventory) {
            displayInventory(inventory);
          }
        });
      }
    });

    // Clear form inputs
    $('#name').val('');
    $('#description').val('');
    $('#quantity').val('');
  });

  // Listen for search input changes
  $('#search').on('input', function() {
    var searchTerm = $(this).val();

    // Send GET request with search term
    $.ajax({
      method: 'GET',
      url: '/search?q=' + searchTerm,
      success: function(results) {
        if (results.length > 0) {
          displayInventory(results);
        } else {
          $('#inventory').html('<p>No matches found</p>');
        }
      }
    });
  });

  // Listen for clear button click
  $('#clear').click(function() {
    // Refresh inventory list
    $.ajax({
      method: 'GET',
      url: '/inventory',
      success: function(inventory) {
        displayInventory(inventory);
        $('#search').val('');
      }
    });
  });

  // Listen for delete button click
  $(document).on('click', '.delete-item', function() {
    var itemId = $(this).data('id');

    // Send DELETE request with item id
    $.ajax({
      method: 'DELETE',
      url: '/inventory/' + itemId,
      success: function() {
        // Refresh inventory list
        $.ajax({
          method: 'GET',
          url: '/inventory',
          success: function(inventory) {
            displayInventory(inventory);
          }
        });
      }
    });
  });

  // Display inventory list
  function displayInventory(inventory) {
    var inventoryList = '';
  
    $.each(inventory, function(index, item) {
      inventoryList += '<li>' + item.name + ': ' + item.description + ' (' + item.quantity + ')' +
        '<button class="delete-item" data-id="' + item.id + '">Delete</button>' +
        '</li>';
    });
  
    $('#inventory').html('<ul>' + inventoryList + '</ul>');
  }
  

  // Initial load of inventory list
  $.ajax({
    method: 'GET',
    url: '/inventory',
    success: function(inventory) {
      displayInventory(inventory);
    }
  });
});
