import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { reviewController } from './review.controller';

import auth from '../../middlewares/auth';
import { ReviewValidation } from './review.validation';

const router = Router();

router
  .route('/')
  .post(
    auth('user', 'admin'),
    validateRequest(ReviewValidation.createReviewValidation),
    reviewController.createReview,
  )
  .get(reviewController.getAllReview);

router
  .route('/:id')
  .delete(auth(), reviewController.deleteReview)
  .patch(auth(), reviewController.updateReview);

router.route('/my').get(auth(), reviewController.getMyReviews);

router.route('/:serviceId').get(reviewController.getServiceReview);

export const reviewRouter = router;
