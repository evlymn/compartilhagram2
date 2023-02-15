import {Component, Inject} from '@angular/core';
import {LanguageService} from "../../shared/services/language/language.service";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'app-post-form-confirm-snackbar',
  templateUrl: './post-form-confirm-snackbar.component.html',
  styleUrls: ['./post-form-confirm-snackbar.component.scss']
})
export class PostFormConfirmSnackbarComponent {
constructor(
  private _bottomSheetRef: MatSnackBarRef<PostFormConfirmSnackbarComponent>,
  @Inject(MAT_SNACK_BAR_DATA) public data: any,
  public languageService: LanguageService) {
  console.log(data)
}

closeSnackbar() {
  this._bottomSheetRef.dismiss();
}
}
