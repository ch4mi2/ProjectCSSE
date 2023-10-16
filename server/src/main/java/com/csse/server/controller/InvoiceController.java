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

@RestController
@RequestMapping("/api/invoice/")
public class InvoiceController {

    @Autowired
    InvoiceService invoiceService;

    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        System.out.println("Get all Invoices");
        return new ResponseEntity<List<Invoice>>(invoiceService.allInvoices(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice payload) {
        return new ResponseEntity<Invoice>(invoiceService.addInvoice(payload), HttpStatus.valueOf(201));
    }
}
