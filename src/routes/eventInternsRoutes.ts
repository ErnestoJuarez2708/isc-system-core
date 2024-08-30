import { Router } from 'express';
import { checkUserAuth } from '../middlewares/checkUserAuth';
import { deleteRegistrationController, getEventInternsController,registerInternController, updateInternType } from '../controllers/eventInternsController';

const router = Router();

router.route('/:id_evento/register').post(registerInternController);
router.route('/:id_evento/registrations').get(getEventInternsController);
router.route('/:id_evento/update-status/:id_becario').put(updateInternType);
router.route('/:id_evento/registrations/:id_becario').delete(deleteRegistrationController);

export default router;