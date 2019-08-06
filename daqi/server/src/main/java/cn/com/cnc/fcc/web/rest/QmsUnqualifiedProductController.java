package cn.com.cnc.fcc.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing QmsQualityControlDetails.
 */
@RestController
@RequestMapping("/api")
public class QmsUnqualifiedProductController {

    private final Logger log = LoggerFactory.getLogger(QmsUnqualifiedProductController.class);

    private static final String ENTITY_NAME = "qmsQualityControlDetails";

    public QmsUnqualifiedProductController() {
    }
}
