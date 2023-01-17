$(document).ready(function() {
    $('.edit-button').on('click', function (event) {

        event.preventDefault();
        let href = $(this).attr('href');

        $.get(href, function(user, status){
            fillUser(user);

            $('#user-profile .modal-header h3').text('Edit User');
            $('#user-profile #password-div').show();
            $("#user-profile #editFirstName").prop("readonly", false);
            $("#user-profile #editLastName").prop("readonly", false);
            $("#user-profile #editAge").prop("readonly", false);
            $("#user-profile #editEmail").prop("readonly", false);
            $("#user-profile #editRoles").prop("disabled", false);
            let submit = $('#user-profile .modal-footer .submit');
            submit.text('Save');
            submit.addClass('btn-primary');
            $('#user-profile #method').val("patch");
            $('#user-profile').modal("show");
        });
    });

    $('.delete-button').on('click', function (event) {

        event.preventDefault();
        let href = $(this).attr('href');

        $.get(href, function(user, status){
            fillUser(user);

            $('#user-profile .modal-header h3').text('Delete User');
            $('#user-profile #password-div').hide();
            $("#user-profile #editFirstName").prop("readonly", true);
            $("#user-profile #editLastName").prop("readonly", true);
            $("#user-profile #editAge").prop("readonly", true);
            $("#user-profile #editEmail").prop("readonly", true);
            $("#user-profile #editRoles").prop("disabled", true);
            let submit = $('#user-profile .modal-footer .submit');
            submit.text('Delete');
            submit.addClass('btn-danger');
            $('#user-profile #method').val("delete");

            $('#user-profile').modal("show");
        });
    });
})

function fillUser(user) {

    $('#editId').val(user.id);
    $('#editFirstName').val(user.firstName);
    $('#editLastName').val(user.lastName);
    $('#editAge').val(user.age);
    $('#editEmail').val(user.email);
    $('#editPassword').val(user.password);
    user.roles.forEach((role) => {
        let selectedRole = document.getElementById(role.name);
        selectedRole.selected = true;
    });

}