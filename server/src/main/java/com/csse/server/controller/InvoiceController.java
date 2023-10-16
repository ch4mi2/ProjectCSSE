package com.csse.server.controller;

import com.csse.server.model.Invoice;
import com.csse.server.model.Order;
import com.csse.server.service.InvoiceService;
import com.csse.server.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/invoice/")
public class InvoiceController {
    private static final Logger logger = LoggerFactory.getLogger(InvoiceController.class);

    @Autowired
    InvoiceService invoiceService;

    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        logger.info("Received a request to get all invoices.");


        return new ResponseEntity<>(invoiceService.allInvoices(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice payload) {
        logger.info("Received a request to create an invoice.");


        return new ResponseEntity<>(invoiceService.addInvoice(payload), HttpStatus.valueOf(201));
    }
}
