# 2026-08-27 — Images to PDF and Uninstall

I've added a new feature, images to pdf. Originally, the image to pdf feature only converted a single image to pdf, but this helps convert from select images which you toggle select with the spacebar.

![Pick images — Space toggles which ones go into the PDF](../media/test_images_to_pdf_select.png)

I have added the feature to enter a desired final name or keep a default merged_FILETYPE_DATE for each file that is created from files. Reason is using a default naming like images.pdf, linux mv will always delete the old copy and replace with this "new" version when those two files are almost certainly unrelated. The default named with date also solves the same problem assuming I don't have a special naming to give.

![Name this PDF — dated default, or type your own](../media/enter_filename_img_to_pdf_test.png)

I have added an uninstall feature as I remember my quiet frustration whenever I cannot uninstall something completely from my computer, making me feel the builder wants to force me to use it (lol)

Here, I plan to system use it as say mango uninstall or something but that should allow full system wipe. If a ui is needed to ask if to keep user files or any additional metrics, I will add them.

Granted, I need it myself to equally test production version so I remove it fully and install a fresh copy from github to ensure it works.
