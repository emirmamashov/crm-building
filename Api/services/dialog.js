module.exports = {
    checkHaveThisDialog(db, diaogId) {
        let newdiaogId = diaogId;
        return new Promise((resolve, reject) => {
            db.Dialog.findById(newdiaogId).then(
                (dialog) => {
                    resolve({
                        dialog: dialog,
                        dialogId: newdiaogId
                    });
                }
            ).catch(
                (err) => {
                    reject(err);
                }
            );
        });
    }
}