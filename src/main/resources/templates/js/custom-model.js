/*所有自定义弹窗*/
/**
 * 确认-取消弹窗
 * @param message 显示信息
 * @param callback 回调
 */
function confirm_cancel_model(message, callback) {
    // 移除已存在的模态框(防止重复添加)
    $('#confirm-modal').remove();
    let modalHTML =
        '<div class="modal" id="confirm-modal">' +
            '<div class="modal-body-small">' +
                '<span class="modal-close" id="confirm-close">&times;</span>' +
                '<div class="modal-body-main modal-body-center-item">' +
                    '<span class="fa fa-exclamation-circle danger-text bold-text center-text large-text">' + message + '</span>' +
                '</div>' +
                '<div class="modal-foot">'+
                    '<button class="confirm-button confirm default-text bold-text center-text" id="confirm-btn">确定</button>' +
                    '<button class="cancel-button cancel default-text bold-text center-text" id="cancel-btn">取消</button>' +
                '</div>'+
            '</div>' +
        '</div>';
    // 将模态框添加到body中
    $('body').append(modalHTML);
    let confirmModal = $("#confirm-modal");
    let closeBtn = $("#confirm-close");
    let confirmBtn = $("#confirm-btn");
    let cancelBtn=$("#cancel-btn");
    // 显示弹窗的函数
    function confirm_showModal() {
        confirmModal.css("display", "block");
    }
    // 函数调用隐藏
    function confirm_hideModal() {
        confirmModal.css("display", "none");
    }
    confirmBtn.on('click', function() {
        confirm_hideModal();
        callback(true);
    });
    // 按钮隐藏弹窗的函数
    closeBtn.on("click", function() {
        confirm_hideModal();
        callback(false);
    });
    cancelBtn.on("click", function() {
        confirm_hideModal();
        callback(false);
    });
    // 显示模态框
    confirm_showModal();
}

/**
 * 只有一个按钮的弹窗
 * @param message
 * @param callback
 */
function confirm_model(message, callback) {
    // 移除已存在的模态框(防止重复添加)
    $('#confirm-modal').remove();
    let modalHTML =
        '<div class="modal" id="confirm-modal">' +
            '<div class="modal-body-small">' +
                '<span class="modal-close" id="confirm-close">&times;</span>' +
                '<div class="modal-body-main modal-body-center-item">' +
                    '<span class="fa fa-exclamation-circle danger-text bold-text center-text large-text">' + message + '</span>' +
                '</div>' +
                '<div class="modal-foot">'+
                    '<button class="confirm-button foot-center-btn default-text bold-text center-text" id="confirm-btn">确定</button>' +
                '</div>'+
            '</div>' +
        '</div>';
    // 将模态框添加到body中
    $('body').append(modalHTML);
    let confirmModal = $("#confirm-modal");
    let closeBtn = $("#confirm-close");
    let confirmBtn = $("#confirm-btn");
    // 显示弹窗的函数
    function confirm_showModal() {
        confirmModal.css("display", "block");
    }
    // 函数调用隐藏
    function confirm_hideModal() {
        confirmModal.css("display", "none");
    }
    confirmBtn.on('click', function() {
        confirm_hideModal();
        callback(true);
    });
    // 按钮隐藏弹窗的函数
    closeBtn.on("click", function() {
        confirm_hideModal();
        callback(true);
    });
    // 显示模态框
    confirm_showModal();
}

/**
 * 不回调弹窗
 * @param message
 */
function model_unCallback(message) {
    // 移除已存在的模态框(防止重复添加)
    $('#confirm-modal').remove();
    let modalHTML =
        '<div class="modal" id="confirm-modal">' +
            '<div class="modal-body-small">' +
                '<span class="modal-close" id="confirm-close">&times;</span>' +
                '<div class="modal-body-main modal-body-center-item">' +
                    '<span class="fa fa-exclamation-circle danger-text bold-text center-text large-text">' + message + '</span>' +
                '</div>' +
                    '<div class="modal-foot">'+
                    '<button class="confirm-button foot-center-btn default-text bold-text center-text" id="confirm-btn">确定</button>' +
                '</div>'+
            '</div>' +
        '</div>';
    $('body').append(modalHTML);
    let confirmModal = $("#confirm-modal");
    let closeBtn = $("#confirm-close");
    let confirmBtn = $("#confirm-btn");
    function confirm_showModal() {
        confirmModal.css("display", "block");
    }
    function confirm_hideModal() {
        confirmModal.css("display", "none");
    }
    confirmBtn.on('click', function() {
        confirm_hideModal();
    });
    closeBtn.on("click", function() {
        confirm_hideModal();
    });
    confirm_showModal();
}