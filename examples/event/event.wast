(module
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (type $i32_i32_=>_none (func (param i32 i32)))
 (type $i32_=>_none (func (param i32)))
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (type $i32_i32_i32_=>_none (func (param i32 i32 i32)))
 (type $none_=>_i32 (func (result i32)))
 (type $none_=>_none (func))
 (type $i32_i32_i32_i32_=>_none (func (param i32 i32 i32 i32)))
 (type $i32_i32_i32_=>_i32 (func (param i32 i32 i32) (result i32)))
 (type $i64_i32_=>_i32 (func (param i64 i32) (result i32)))
 (type $i64_i64_=>_i32 (func (param i64 i64) (result i32)))
 (import "env" "memory" (memory $0 2 16))
 (data (i32.const 1036) "\04\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\04\00\00\00\d1\83Q+")
 (data (i32.const 1068) "\04\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\04\00\00\00j7\12\e2")
 (data (i32.const 1100) "\1e\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\1e\00\00\00u\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00n\00u\00l\00l\00")
 (data (i32.const 1164) "\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data (i32.const 1196) "\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data (i32.const 1228) "\04\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\04\00\00\00\c0\96\a5\f8")
 (data (i32.const 1260) "\08\00\00\00\01\00\00\00\00\00\00\00\19\00\00\00\08\00\00\00\01\00\00\00\00\00\00\00")
 (import "seal0" "seal_input" (func $../../src/seal/seal0/seal_input (param i32 i32)))
 (import "seal0" "seal_deposit_event" (func $../../src/seal/seal0/seal_deposit_event (param i32 i32 i32 i32)))
 (import "seal0" "seal_value_transferred" (func $../../src/seal/seal0/seal_value_transferred (param i32 i32)))
 (table $0 2 funcref)
 (elem (i32.const 1) $../../src/seal/seal0/seal_value_transferred)
 (global $~lib/rt/stub/offset (mut i32) (i32.const 0))
 (global $../../src/buildins/Event/Event._topics (mut i32) (i32.const 0))
 (global $../../src/buildins/Event/Event._data (mut i32) (i32.const 0))
 (global $event/msg (mut i32) (i32.const 0))
 (export "deploy" (func $event/deploy))
 (export "call" (func $event/call))
 (start $~start)
 (func $~lib/rt/stub/computeSize (param $0 i32) (result i32)
  (i32.sub
   (i32.and
    (i32.add
     (local.get $0)
     (i32.const 19)
    )
    (i32.const -16)
   )
   (i32.const 4)
  )
 )
 (func $~lib/rt/stub/maybeGrowMemory (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (if
   (i32.gt_u
    (local.get $0)
    (local.tee $1
     (i32.and
      (i32.add
       (i32.shl
        (local.tee $2
         (memory.size)
        )
        (i32.const 16)
       )
       (i32.const 15)
      )
      (i32.const -16)
     )
    )
   )
   (if
    (i32.lt_s
     (memory.grow
      (select
       (local.get $2)
       (local.tee $1
        (i32.shr_u
         (i32.and
          (i32.add
           (i32.sub
            (local.get $0)
            (local.get $1)
           )
           (i32.const 65535)
          )
          (i32.const -65536)
         )
         (i32.const 16)
        )
       )
       (i32.lt_s
        (local.get $1)
        (local.get $2)
       )
      )
     )
     (i32.const 0)
    )
    (if
     (i32.lt_s
      (memory.grow
       (local.get $1)
      )
      (i32.const 0)
     )
     (unreachable)
    )
   )
  )
  (global.set $~lib/rt/stub/offset
   (local.get $0)
  )
 )
 (func $~lib/rt/stub/__alloc (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (if
   (i32.gt_u
    (local.get $0)
    (i32.const 1073741820)
   )
   (unreachable)
  )
  (local.set $1
   (global.get $~lib/rt/stub/offset)
  )
  (call $~lib/rt/stub/maybeGrowMemory
   (i32.add
    (local.tee $2
     (i32.add
      (global.get $~lib/rt/stub/offset)
      (i32.const 4)
     )
    )
    (local.tee $0
     (call $~lib/rt/stub/computeSize
      (local.get $0)
     )
    )
   )
  )
  (i32.store
   (local.get $1)
   (local.get $0)
  )
  (local.get $2)
 )
 (func $~lib/rt/stub/__new (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (if
   (i32.gt_u
    (local.get $0)
    (i32.const 1073741804)
   )
   (unreachable)
  )
  (i32.store offset=4
   (local.tee $2
    (i32.sub
     (local.tee $3
      (call $~lib/rt/stub/__alloc
       (i32.add
        (local.get $0)
        (i32.const 16)
       )
      )
     )
     (i32.const 4)
    )
   )
   (i32.const 0)
  )
  (i32.store offset=8
   (local.get $2)
   (i32.const 0)
  )
  (i32.store offset=12
   (local.get $2)
   (local.get $1)
  )
  (i32.store offset=16
   (local.get $2)
   (local.get $0)
  )
  (i32.add
   (local.get $3)
   (i32.const 16)
  )
 )
 (func $~lib/memory/memory.fill (param $0 i32) (param $1 i32)
  (local $2 i32)
  (loop $while-continue|0
   (if
    (local.get $1)
    (block
     (local.set $0
      (i32.add
       (local.tee $2
        (local.get $0)
       )
       (i32.const 1)
      )
     )
     (i32.store8
      (local.get $2)
      (i32.const 0)
     )
     (local.set $1
      (i32.sub
       (local.get $1)
       (i32.const 1)
      )
     )
     (br $while-continue|0)
    )
   )
  )
 )
 (func $~lib/array/Array<~lib/as-scale-codec/interfaces/Codec/Codec>#constructor (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (i32.store
   (local.tee $0
    (call $~lib/rt/stub/__new
     (i32.const 16)
     (i32.const 5)
    )
   )
   (i32.const 0)
  )
  (i32.store offset=4
   (local.get $0)
   (i32.const 0)
  )
  (i32.store offset=8
   (local.get $0)
   (i32.const 0)
  )
  (i32.store offset=12
   (local.get $0)
   (i32.const 0)
  )
  (call $~lib/memory/memory.fill
   (local.tee $2
    (call $~lib/rt/stub/__new
     (i32.const 0)
     (i32.const 0)
    )
   )
   (i32.const 0)
  )
  (drop
   (i32.load
    (local.tee $1
     (local.get $0)
    )
   )
  )
  (i32.store
   (local.get $0)
   (local.tee $0
    (local.get $2)
   )
  )
  (i32.store offset=4
   (local.get $1)
   (local.get $0)
  )
  (i32.store offset=8
   (local.get $1)
   (i32.const 0)
  )
  (i32.store offset=12
   (local.get $1)
   (i32.const 0)
  )
  (local.get $1)
 )
 (func $~lib/memory/memory.copy (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (block $~lib/util/memory/memmove|inlined.0
   (local.set $4
    (local.get $2)
   )
   (br_if $~lib/util/memory/memmove|inlined.0
    (i32.eq
     (local.get $0)
     (local.get $1)
    )
   )
   (if
    (i32.lt_u
     (local.get $0)
     (local.get $1)
    )
    (loop $while-continue|0
     (if
      (local.get $4)
      (block
       (local.set $0
        (i32.add
         (local.tee $2
          (local.get $0)
         )
         (i32.const 1)
        )
       )
       (local.set $1
        (i32.add
         (local.tee $3
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (i32.store8
        (local.get $2)
        (i32.load8_u
         (local.get $3)
        )
       )
       (local.set $4
        (i32.sub
         (local.get $4)
         (i32.const 1)
        )
       )
       (br $while-continue|0)
      )
     )
    )
    (loop $while-continue|1
     (if
      (local.get $4)
      (block
       (i32.store8
        (i32.add
         (local.tee $4
          (i32.sub
           (local.get $4)
           (i32.const 1)
          )
         )
         (local.get $0)
        )
        (i32.load8_u
         (i32.add
          (local.get $1)
          (local.get $4)
         )
        )
       )
       (br $while-continue|1)
      )
     )
    )
   )
  )
 )
 (func $~lib/rt/__newArray (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local.set $4
   (local.tee $2
    (call $~lib/rt/stub/__new
     (i32.const 16)
     (i32.const 7)
    )
   )
  )
  (local.set $3
   (call $~lib/rt/stub/__new
    (local.get $0)
    (i32.const 0)
   )
  )
  (if
   (local.get $1)
   (call $~lib/memory/memory.copy
    (local.get $3)
    (local.get $1)
    (local.get $0)
   )
  )
  (i32.store
   (local.get $4)
   (local.get $3)
  )
  (i32.store offset=4
   (local.get $2)
   (local.get $3)
  )
  (i32.store offset=8
   (local.get $2)
   (local.get $0)
  )
  (i32.store offset=12
   (local.get $2)
   (local.get $0)
  )
  (local.get $2)
 )
 (func $event/EventEmitter#constructor
  (drop
   (call $~lib/rt/stub/__new
    (i32.const 0)
    (i32.const 12)
   )
  )
 )
 (func $~lib/typedarray/Uint8Array#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (i32.store
   (block (result i32)
    (if
     (i32.eqz
      (local.tee $1
       (call $~lib/rt/stub/__new
        (i32.const 12)
        (i32.const 15)
       )
      )
     )
     (local.set $1
      (call $~lib/rt/stub/__new
       (i32.const 12)
       (i32.const 2)
      )
     )
    )
    (local.get $1)
   )
   (i32.const 0)
  )
  (i32.store offset=4
   (local.get $1)
   (i32.const 0)
  )
  (i32.store offset=8
   (local.get $1)
   (i32.const 0)
  )
  (if
   (i32.gt_u
    (local.get $0)
    (i32.const 1073741820)
   )
   (unreachable)
  )
  (call $~lib/memory/memory.fill
   (local.tee $2
    (call $~lib/rt/stub/__new
     (local.get $0)
     (i32.const 0)
    )
   )
   (local.get $0)
  )
  (drop
   (i32.load
    (local.get $1)
   )
  )
  (i32.store
   (local.get $1)
   (local.get $2)
  )
  (i32.store offset=4
   (local.get $1)
   (local.get $2)
  )
  (i32.store offset=8
   (local.get $1)
   (local.get $0)
  )
  (local.get $1)
 )
 (func $../../src/primitives/readbuffer/ReadBuffer#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (i32.store
   (local.tee $2
    (call $~lib/rt/stub/__new
     (i32.const 8)
     (i32.const 14)
    )
   )
   (i32.const 0)
  )
  (i32.store offset=4
   (local.get $2)
   (i32.const 0)
  )
  (local.set $1
   (call $~lib/typedarray/Uint8Array#constructor
    (local.get $0)
   )
  )
  (drop
   (i32.load
    (local.get $2)
   )
  )
  (i32.store
   (local.get $2)
   (local.get $1)
  )
  (local.set $1
   (i32.const 0)
  )
  (i32.store
   (local.tee $3
    (call $~lib/rt/stub/__new
     (i32.const 4)
     (i32.const 16)
    )
   )
   (i32.const 0)
  )
  (local.set $4
   (call $~lib/typedarray/Uint8Array#constructor
    (i32.const 4)
   )
  )
  (drop
   (i32.load
    (local.get $3)
   )
  )
  (i32.store
   (local.get $3)
   (local.get $4)
  )
  (loop $for-loop|0
   (if
    (i32.lt_s
     (local.get $1)
     (i32.const 4)
    )
    (block
     (local.set $4
      (i32.and
       (i32.shr_u
        (local.get $0)
        (i32.shl
         (local.get $1)
         (i32.const 3)
        )
       )
       (i32.const 255)
      )
     )
     (if
      (i32.ge_u
       (local.get $1)
       (i32.load offset=8
        (local.tee $5
         (i32.load
          (local.get $3)
         )
        )
       )
      )
      (unreachable)
     )
     (i32.store8
      (i32.add
       (local.get $1)
       (i32.load offset=4
        (local.get $5)
       )
      )
      (local.get $4)
     )
     (local.set $1
      (i32.add
       (local.get $1)
       (i32.const 1)
      )
     )
     (br $for-loop|0)
    )
   )
  )
  (drop
   (i32.load offset=4
    (local.get $2)
   )
  )
  (i32.store offset=4
   (local.get $2)
   (local.get $3)
  )
  (local.get $2)
 )
 (func $../../src/primitives/readbuffer/ReadBuffer#get:valueBuffer (param $0 i32) (result i32)
  (i32.load
   (i32.load
    (local.get $0)
   )
  )
 )
 (func $../../src/primitives/readbuffer/ReadBuffer#get:sizeBuffer (param $0 i32) (result i32)
  (call $../../src/primitives/readbuffer/ReadBuffer#get:valueBuffer
   (i32.load offset=4
    (local.get $0)
   )
  )
 )
 (func $~lib/array/Array<u8>#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (i32.store
   (local.tee $2
    (call $~lib/rt/stub/__new
     (i32.const 16)
     (i32.const 7)
    )
   )
   (i32.const 0)
  )
  (i32.store offset=4
   (local.get $2)
   (i32.const 0)
  )
  (i32.store offset=8
   (local.get $2)
   (i32.const 0)
  )
  (i32.store offset=12
   (local.get $2)
   (i32.const 0)
  )
  (if
   (i32.gt_u
    (local.get $0)
    (i32.const 1073741820)
   )
   (unreachable)
  )
  (call $~lib/memory/memory.fill
   (local.tee $0
    (call $~lib/rt/stub/__new
     (local.tee $1
      (local.get $0)
     )
     (i32.const 0)
    )
   )
   (local.get $1)
  )
  (drop
   (i32.load
    (local.get $2)
   )
  )
  (i32.store
   (local.get $2)
   (local.get $0)
  )
  (i32.store offset=4
   (local.get $2)
   (local.get $0)
  )
  (i32.store offset=8
   (local.get $2)
   (local.get $1)
  )
  (i32.store offset=12
   (local.get $2)
   (local.get $1)
  )
  (local.get $2)
 )
 (func $../../src/primitives/readbuffer/ReadBuffer#get:valueBytes (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local.set $2
   (i32.load
    (local.get $0)
   )
  )
  (local.set $3
   (i32.load offset=4
    (local.get $0)
   )
  )
  (local.set $0
   (i32.const 0)
  )
  (local.set $1
   (i32.const 3)
  )
  (loop $for-loop|0
   (if
    (i32.ge_s
     (local.get $1)
     (i32.const 0)
    )
    (block
     (if
      (i32.ge_u
       (local.get $1)
       (i32.load offset=8
        (local.tee $4
         (i32.load
          (local.get $3)
         )
        )
       )
      )
      (unreachable)
     )
     (local.set $0
      (i32.or
       (local.get $0)
       (i32.shl
        (i32.load8_u
         (i32.add
          (local.get $1)
          (i32.load offset=4
           (local.get $4)
          )
         )
        )
        (i32.shl
         (local.get $1)
         (i32.const 3)
        )
       )
      )
     )
     (local.set $1
      (i32.sub
       (local.get $1)
       (i32.const 1)
      )
     )
     (br $for-loop|0)
    )
   )
  )
  (call $~lib/memory/memory.copy
   (i32.load
    (local.tee $1
     (call $~lib/array/Array<u8>#constructor
      (block (result i32)
       (if
        (i32.eq
         (local.get $0)
         (i32.const -1)
        )
        (local.set $0
         (i32.load offset=8
          (local.get $2)
         )
        )
       )
       (local.get $0)
      )
     )
    )
   )
   (i32.load
    (local.get $2)
   )
   (local.get $0)
  )
  (local.get $1)
 )
 (func $~lib/array/Array<u8>#slice (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local.set $3
   (i32.load offset=12
    (local.get $0)
   )
  )
  (local.set $1
   (if (result i32)
    (i32.lt_s
     (local.get $1)
     (i32.const 0)
    )
    (select
     (local.tee $1
      (i32.add
       (local.get $1)
       (local.get $3)
      )
     )
     (i32.const 0)
     (i32.gt_s
      (local.get $1)
      (i32.const 0)
     )
    )
    (select
     (local.get $1)
     (local.get $3)
     (i32.lt_s
      (local.get $1)
      (local.get $3)
     )
    )
   )
  )
  (call $~lib/memory/memory.copy
   (i32.load offset=4
    (local.tee $3
     (call $~lib/rt/__newArray
      (local.tee $2
       (select
        (local.tee $2
         (i32.sub
          (if (result i32)
           (i32.lt_s
            (local.get $2)
            (i32.const 0)
           )
           (select
            (local.tee $2
             (i32.add
              (local.get $2)
              (local.get $3)
             )
            )
            (i32.const 0)
            (i32.gt_s
             (local.get $2)
             (i32.const 0)
            )
           )
           (select
            (local.get $2)
            (local.get $3)
            (i32.lt_s
             (local.get $2)
             (local.get $3)
            )
           )
          )
          (local.get $1)
         )
        )
        (i32.const 0)
        (i32.gt_s
         (local.get $2)
         (i32.const 0)
        )
       )
      )
      (i32.const 0)
     )
    )
   )
   (i32.add
    (local.get $1)
    (i32.load offset=4
     (local.get $0)
    )
   )
   (local.get $2)
  )
  (local.get $3)
 )
 (func $../../src/primitives/inputdata/MessageInputReader#get:fnParameters (param $0 i32) (result i32)
  (if
   (i32.eq
    (i32.load offset=12
     (call $../../src/primitives/readbuffer/ReadBuffer#get:valueBytes
      (i32.load
       (local.get $0)
      )
     )
    )
    (i32.const 4)
   )
   (return
    (call $~lib/rt/__newArray
     (i32.const 0)
     (i32.const 1184)
    )
   )
  )
  (call $~lib/array/Array<u8>#slice
   (call $../../src/primitives/readbuffer/ReadBuffer#get:valueBytes
    (i32.load
     (local.get $0)
    )
   )
   (i32.const 4)
   (i32.const 2147483647)
  )
 )
 (func $../../src/buildins/Msg/Msg#init_sig_and_data (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (if
   (if (result i32)
    (i32.load offset=8
     (local.get $0)
    )
    (i32.eqz
     (i32.load offset=12
      (local.get $0)
     )
    )
    (i32.const 1)
   )
   (block
    (i32.store
     (local.tee $1
      (call $~lib/rt/stub/__new
       (i32.const 4)
       (i32.const 13)
      )
     )
     (i32.const 0)
    )
    (local.set $2
     (call $../../src/primitives/readbuffer/ReadBuffer#constructor
      (i32.const 1024)
     )
    )
    (drop
     (i32.load
      (local.get $1)
     )
    )
    (i32.store
     (local.get $1)
     (local.get $2)
    )
    (call $../../src/seal/seal0/seal_input
     (call $../../src/primitives/readbuffer/ReadBuffer#get:valueBuffer
      (i32.load
       (local.get $1)
      )
     )
     (call $../../src/primitives/readbuffer/ReadBuffer#get:sizeBuffer
      (i32.load
       (local.get $1)
      )
     )
    )
    (if
     (i32.eqz
      (i32.load offset=8
       (local.get $0)
      )
     )
     (block
      (local.set $2
       (call $~lib/array/Array<u8>#constructor
        (i32.const 4)
       )
      )
      (drop
       (i32.load offset=8
        (local.get $0)
       )
      )
      (i32.store offset=8
       (local.get $0)
       (local.get $2)
      )
      (if
       (i32.eqz
        (local.tee $2
         (i32.load offset=8
          (local.get $0)
         )
        )
       )
       (unreachable)
      )
      (call $~lib/memory/memory.copy
       (i32.load
        (local.get $2)
       )
       (i32.load
        (call $~lib/array/Array<u8>#slice
         (call $../../src/primitives/readbuffer/ReadBuffer#get:valueBytes
          (i32.load
           (local.get $1)
          )
         )
         (i32.const 0)
         (i32.const 4)
        )
       )
       (i32.const 4)
      )
     )
    )
    (local.set $3
     (i32.load offset=12
      (call $../../src/primitives/inputdata/MessageInputReader#get:fnParameters
       (local.get $1)
      )
     )
    )
    (if
     (i32.eqz
      (i32.load offset=12
       (local.get $0)
      )
     )
     (if
      (i32.gt_s
       (local.get $3)
       (i32.const 0)
      )
      (block
       (local.set $2
        (call $~lib/array/Array<u8>#constructor
         (local.get $3)
        )
       )
       (drop
        (i32.load offset=12
         (local.get $0)
        )
       )
       (i32.store offset=12
        (local.get $0)
        (local.get $2)
       )
       (if
        (i32.eqz
         (local.tee $0
          (i32.load offset=12
           (local.get $0)
          )
         )
        )
        (unreachable)
       )
       (call $~lib/memory/memory.copy
        (i32.load
         (local.get $0)
        )
        (i32.load
         (call $../../src/primitives/inputdata/MessageInputReader#get:fnParameters
          (local.get $1)
         )
        )
        (local.get $3)
       )
      )
      (block
       (local.set $1
        (call $~lib/rt/__newArray
         (i32.const 0)
         (i32.const 1216)
        )
       )
       (drop
        (i32.load offset=12
         (local.get $0)
        )
       )
       (i32.store offset=12
        (local.get $0)
        (local.get $1)
       )
      )
     )
    )
   )
  )
 )
 (func $../../src/buildins/Msg/Msg#get:sig (param $0 i32) (result i32)
  (if
   (i32.eqz
    (i32.load offset=8
     (local.get $0)
    )
   )
   (call $../../src/buildins/Msg/Msg#init_sig_and_data
    (local.get $0)
   )
  )
  (if
   (i32.eqz
    (local.tee $0
     (i32.load offset=8
      (local.get $0)
     )
    )
   )
   (unreachable)
  )
  (local.get $0)
 )
 (func $../../src/buildins/Msg/Msg#isSelector (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (if
   (i32.ne
    (i32.load offset=12
     (call $../../src/buildins/Msg/Msg#get:sig
      (local.get $0)
     )
    )
    (i32.load offset=12
     (local.tee $2
      (local.get $1)
     )
    )
   )
   (return
    (i32.const 0)
   )
  )
  (local.set $1
   (i32.const 4)
  )
  (block $~lib/util/memory/memcmp|inlined.0
   (br_if $~lib/util/memory/memcmp|inlined.0
    (i32.eq
     (local.tee $3
      (i32.load
       (call $../../src/buildins/Msg/Msg#get:sig
        (local.get $0)
       )
      )
     )
     (local.tee $2
      (i32.load
       (local.get $2)
      )
     )
    )
   )
   (loop $while-continue|0
    (local.set $1
     (i32.sub
      (local.tee $0
       (local.get $1)
      )
      (i32.const 1)
     )
    )
    (if
     (local.get $0)
     (block
      (local.set $4
       (i32.sub
        (local.tee $0
         (i32.load8_u
          (local.get $3)
         )
        )
        (local.tee $5
         (i32.load8_u
          (local.get $2)
         )
        )
       )
      )
      (br_if $~lib/util/memory/memcmp|inlined.0
       (i32.ne
        (local.get $0)
        (local.get $5)
       )
      )
      (local.set $3
       (i32.add
        (local.get $3)
        (i32.const 1)
       )
      )
      (local.set $2
       (i32.add
        (local.get $2)
        (i32.const 1)
       )
      )
      (br $while-continue|0)
     )
    )
   )
   (local.set $4
    (i32.const 0)
   )
  )
  (i32.eqz
   (local.get $4)
  )
 )
 (func $event/deploy (result i32)
  (local $0 i32)
  (local $1 i32)
  (local.set $0
   (call $~lib/rt/__newArray
    (i32.const 4)
    (i32.const 1056)
   )
  )
  (local.set $1
   (call $~lib/rt/__newArray
    (i32.const 4)
    (i32.const 1088)
   )
  )
  (call $event/EventEmitter#constructor)
  (if
   (i32.eqz
    (call $../../src/buildins/Msg/Msg#isSelector
     (global.get $event/msg)
     (local.get $0)
    )
   )
   (drop
    (call $../../src/buildins/Msg/Msg#isSelector
     (global.get $event/msg)
     (local.get $1)
    )
   )
  )
  (i32.const 0)
 )
 (func $~lib/as-scale-codec/UInt/UInt8/UInt8#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (i32.store
   (block (result i32)
    (if
     (i32.eqz
      (local.tee $1
       (call $~lib/rt/stub/__new
        (i32.const 5)
        (i32.const 19)
       )
      )
     )
     (local.set $1
      (call $~lib/rt/stub/__new
       (i32.const 5)
       (i32.const 20)
      )
     )
    )
    (local.get $1)
   )
   (i32.const 0)
  )
  (i32.store8 offset=4
   (local.get $1)
   (i32.const 0)
  )
  (i32.store8 offset=4
   (local.get $1)
   (local.get $0)
  )
  (i32.store
   (local.get $1)
   (i32.const 1)
  )
  (local.get $1)
 )
 (func $~lib/array/ensureSize (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (if
   (i32.gt_u
    (local.get $1)
    (i32.shr_u
     (local.tee $6
      (i32.load offset=8
       (local.get $0)
      )
     )
     (local.get $2)
    )
   )
   (block
    (if
     (i32.gt_u
      (local.get $1)
      (i32.shr_u
       (i32.const 1073741820)
       (local.get $2)
      )
     )
     (unreachable)
    )
    (local.set $3
     (local.tee $10
      (i32.load
       (local.get $0)
      )
     )
    )
    (local.set $7
     (local.tee $5
      (i32.shl
       (local.get $1)
       (local.get $2)
      )
     )
    )
    (if
     (i32.gt_u
      (local.get $5)
      (i32.const 1073741804)
     )
     (unreachable)
    )
    (local.set $4
     (i32.add
      (local.get $7)
      (i32.const 16)
     )
    )
    (if
     (i32.eqz
      (select
       (i32.eqz
        (i32.and
         (local.tee $1
          (i32.sub
           (local.get $3)
           (i32.const 16)
          )
         )
         (i32.const 15)
        )
       )
       (i32.const 0)
       (local.get $1)
      )
     )
     (unreachable)
    )
    (local.set $9
     (i32.eq
      (global.get $~lib/rt/stub/offset)
      (i32.add
       (local.get $1)
       (local.tee $3
        (i32.load
         (local.tee $8
          (i32.sub
           (local.get $1)
           (i32.const 4)
          )
         )
        )
       )
      )
     )
    )
    (local.set $2
     (call $~lib/rt/stub/computeSize
      (local.get $4)
     )
    )
    (if
     (i32.lt_u
      (local.get $3)
      (local.get $4)
     )
     (if
      (local.get $9)
      (block
       (if
        (i32.gt_u
         (local.get $4)
         (i32.const 1073741820)
        )
        (unreachable)
       )
       (call $~lib/rt/stub/maybeGrowMemory
        (i32.add
         (local.get $1)
         (local.get $2)
        )
       )
       (i32.store
        (local.get $8)
        (local.get $2)
       )
      )
      (block
       (call $~lib/memory/memory.copy
        (local.tee $2
         (call $~lib/rt/stub/__alloc
          (select
           (local.get $2)
           (local.tee $4
            (i32.shl
             (local.get $3)
             (i32.const 1)
            )
           )
           (i32.gt_u
            (local.get $2)
            (local.get $4)
           )
          )
         )
        )
        (local.get $1)
        (local.get $3)
       )
       (local.set $1
        (local.get $2)
       )
      )
     )
     (if
      (local.get $9)
      (block
       (global.set $~lib/rt/stub/offset
        (i32.add
         (local.get $1)
         (local.get $2)
        )
       )
       (i32.store
        (local.get $8)
        (local.get $2)
       )
      )
     )
    )
    (i32.store offset=16
     (i32.sub
      (local.get $1)
      (i32.const 4)
     )
     (local.get $7)
    )
    (call $~lib/memory/memory.fill
     (i32.add
      (local.get $6)
      (local.tee $1
       (i32.add
        (local.get $1)
        (i32.const 16)
       )
      )
     )
     (i32.sub
      (local.get $5)
      (local.get $6)
     )
    )
    (if
     (i32.ne
      (local.get $1)
      (local.get $10)
     )
     (block
      (i32.store
       (local.get $0)
       (local.get $1)
      )
      (i32.store offset=4
       (local.get $0)
       (local.get $1)
      )
     )
    )
    (i32.store offset=8
     (local.get $0)
     (local.get $5)
    )
   )
  )
 )
 (func $~lib/array/Array<~lib/as-scale-codec/interfaces/Codec/Codec>#push (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (call $~lib/array/ensureSize
   (local.get $0)
   (local.tee $3
    (i32.add
     (local.tee $2
      (i32.load offset=12
       (local.get $0)
      )
     )
     (i32.const 1)
    )
   )
   (i32.const 2)
  )
  (i32.store
   (i32.add
    (i32.load offset=4
     (local.get $0)
    )
    (i32.shl
     (local.get $2)
     (i32.const 2)
    )
   )
   (local.get $1)
  )
  (i32.store offset=12
   (local.get $0)
   (local.get $3)
  )
 )
 (func $../../src/buildins/Event/Event.appendTopic<~lib/as-scale-codec/UInt/UInt8/UInt8> (param $0 i32)
  (call $~lib/array/Array<~lib/as-scale-codec/interfaces/Codec/Codec>#push
   (global.get $../../src/buildins/Event/Event._topics)
   (local.get $0)
  )
 )
 (func $../../src/buildins/Event/Event.appendData<~lib/as-scale-codec/UInt/UInt8/UInt8> (param $0 i32)
  (call $~lib/array/Array<~lib/as-scale-codec/interfaces/Codec/Codec>#push
   (global.get $../../src/buildins/Event/Event._data)
   (local.get $0)
  )
 )
 (func $~lib/array/Array<~lib/as-scale-codec/interfaces/Codec/Codec>#__get (param $0 i32) (param $1 i32) (result i32)
  (if
   (i32.ge_u
    (local.get $1)
    (i32.load offset=12
     (local.get $0)
    )
   )
   (unreachable)
  )
  (if
   (i32.eqz
    (local.tee $0
     (i32.load
      (i32.add
       (i32.load offset=4
        (local.get $0)
       )
       (i32.shl
        (local.get $1)
        (i32.const 2)
       )
      )
     )
    )
   )
   (unreachable)
  )
  (local.get $0)
 )
 (func $~lib/array/Array<u8>#concat (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (if
   (i32.gt_u
    (local.tee $2
     (i32.add
      (local.tee $3
       (i32.load offset=12
        (local.get $0)
       )
      )
      (local.tee $4
       (select
        (i32.load offset=12
         (local.get $1)
        )
        (i32.const 0)
        (local.get $1)
       )
      )
     )
    )
    (i32.const 1073741820)
   )
   (unreachable)
  )
  (call $~lib/memory/memory.copy
   (local.tee $2
    (i32.load offset=4
     (call $~lib/rt/__newArray
      (local.get $2)
      (i32.const 0)
     )
    )
   )
   (i32.load offset=4
    (local.get $0)
   )
   (local.get $3)
  )
  (call $~lib/memory/memory.copy
   (i32.add
    (local.get $2)
    (local.get $3)
   )
   (i32.load offset=4
    (local.get $1)
   )
   (local.get $4)
  )
 )
 (func $../../src/primitives/writebuffer/WriteBuffer#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (i32.store
   (local.tee $1
    (call $~lib/rt/stub/__new
     (i32.const 4)
     (i32.const 24)
    )
   )
   (i32.const 0)
  )
  (local.set $3
   (i32.load offset=16
    (i32.sub
     (local.get $0)
     (i32.const 20)
    )
   )
  )
  (i32.store
   (local.tee $2
    (call $~lib/rt/stub/__new
     (i32.const 12)
     (i32.const 15)
    )
   )
   (local.get $0)
  )
  (i32.store offset=8
   (local.get $2)
   (local.get $3)
  )
  (i32.store offset=4
   (local.get $2)
   (local.get $0)
  )
  (drop
   (i32.load
    (local.get $1)
   )
  )
  (i32.store
   (local.get $1)
   (local.get $2)
  )
  (local.get $1)
 )
 (func $../../src/primitives/writebuffer/WriteBuffer#get:size (param $0 i32) (result i32)
  (i32.load offset=8
   (i32.load
    (local.get $0)
   )
  )
 )
 (func $~lib/array/Array<~lib/as-scale-codec/interfaces/Codec/Codec>#set:length (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (if
   (i32.gt_s
    (local.tee $1
     (i32.load offset=12
      (local.get $0)
     )
    )
    (i32.const 0)
   )
   (block
    (local.set $1
     (i32.add
      (local.tee $2
       (i32.load offset=4
        (local.get $0)
       )
      )
      (i32.shl
       (local.get $1)
       (i32.const 2)
      )
     )
    )
    (loop $do-continue|0
     (drop
      (i32.load
       (local.get $2)
      )
     )
     (br_if $do-continue|0
      (i32.lt_u
       (local.tee $2
        (i32.add
         (local.get $2)
         (i32.const 4)
        )
       )
       (local.get $1)
      )
     )
    )
   )
   (call $~lib/array/ensureSize
    (local.get $0)
    (i32.const 0)
    (i32.const 2)
   )
  )
  (i32.store offset=12
   (local.get $0)
   (i32.const 0)
  )
 )
 (func $../../src/buildins/Event/Event.emit<event/Approved> (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (call $../../src/buildins/Event/Event.appendTopic<~lib/as-scale-codec/UInt/UInt8/UInt8>
   (i32.load
    (local.get $0)
   )
  )
  (call $../../src/buildins/Event/Event.appendTopic<~lib/as-scale-codec/UInt/UInt8/UInt8>
   (i32.load offset=4
    (local.get $0)
   )
  )
  (call $../../src/buildins/Event/Event.appendData<~lib/as-scale-codec/UInt/UInt8/UInt8>
   (i32.load
    (local.get $0)
   )
  )
  (call $../../src/buildins/Event/Event.appendData<~lib/as-scale-codec/UInt/UInt8/UInt8>
   (i32.load offset=4
    (local.get $0)
   )
  )
  (call $../../src/buildins/Event/Event.appendData<~lib/as-scale-codec/UInt/UInt8/UInt8>
   (i32.load offset=8
    (local.get $0)
   )
  )
  (if
   (i32.gt_s
    (i32.load offset=12
     (global.get $../../src/buildins/Event/Event._topics)
    )
    (i32.const 4)
   )
   (unreachable)
  )
  (local.set $2
   (call $~lib/array/Array<u8>#constructor
    (i32.const 0)
   )
  )
  (loop $for-loop|0
   (if
    (i32.lt_s
     (local.get $1)
     (i32.load offset=12
      (global.get $../../src/buildins/Event/Event._topics)
     )
    )
    (block
     (call $~lib/array/Array<u8>#concat
      (local.get $2)
      (call $~lib/as-scale-codec/interfaces/Codec/Codec#toU8a@virtual
       (call $~lib/array/Array<~lib/as-scale-codec/interfaces/Codec/Codec>#__get
        (global.get $../../src/buildins/Event/Event._topics)
        (local.get $1)
       )
      )
     )
     (local.set $1
      (i32.add
       (local.get $1)
       (i32.const 1)
      )
     )
     (br $for-loop|0)
    )
   )
  )
  (local.set $1
   (call $~lib/array/Array<u8>#constructor
    (i32.const 0)
   )
  )
  (local.set $0
   (i32.const 0)
  )
  (loop $for-loop|1
   (if
    (i32.lt_s
     (local.get $0)
     (i32.load offset=12
      (global.get $../../src/buildins/Event/Event._data)
     )
    )
    (block
     (call $~lib/array/Array<u8>#concat
      (local.get $1)
      (call $~lib/as-scale-codec/interfaces/Codec/Codec#toU8a@virtual
       (call $~lib/array/Array<~lib/as-scale-codec/interfaces/Codec/Codec>#__get
        (global.get $../../src/buildins/Event/Event._data)
        (local.get $0)
       )
      )
     )
     (local.set $0
      (i32.add
       (local.get $0)
       (i32.const 1)
      )
     )
     (br $for-loop|1)
    )
   )
  )
  (if
   (i32.eqz
    (i32.load offset=12
     (global.get $../../src/buildins/Event/Event._data)
    )
   )
   (unreachable)
  )
  (local.set $0
   (call $../../src/primitives/writebuffer/WriteBuffer#constructor
    (i32.load
     (local.get $2)
    )
   )
  )
  (local.set $1
   (call $../../src/primitives/writebuffer/WriteBuffer#constructor
    (i32.load
     (local.get $1)
    )
   )
  )
  (call $../../src/seal/seal0/seal_deposit_event
   (call $../../src/primitives/readbuffer/ReadBuffer#get:valueBuffer
    (local.get $0)
   )
   (call $../../src/primitives/writebuffer/WriteBuffer#get:size
    (local.get $0)
   )
   (call $../../src/primitives/readbuffer/ReadBuffer#get:valueBuffer
    (local.get $1)
   )
   (call $../../src/primitives/writebuffer/WriteBuffer#get:size
    (local.get $1)
   )
  )
  (call $~lib/array/Array<~lib/as-scale-codec/interfaces/Codec/Codec>#set:length
   (global.get $../../src/buildins/Event/Event._topics)
  )
  (call $~lib/array/Array<~lib/as-scale-codec/interfaces/Codec/Codec>#set:length
   (global.get $../../src/buildins/Event/Event._data)
  )
 )
 (func $~lib/as-bignum/integer/u128/u128#constructor (param $0 i64) (param $1 i64) (result i32)
  (local $2 i32)
  (i64.store
   (local.tee $2
    (call $~lib/rt/stub/__new
     (i32.const 16)
     (i32.const 9)
    )
   )
   (local.get $0)
  )
  (i64.store offset=8
   (local.get $2)
   (local.get $1)
  )
  (local.get $2)
 )
 (func $~lib/array/Array<u8>#__get (param $0 i32) (param $1 i32) (result i32)
  (if
   (i32.ge_u
    (local.get $1)
    (i32.load offset=12
     (local.get $0)
    )
   )
   (unreachable)
  )
  (i32.load8_u
   (i32.add
    (i32.load offset=4
     (local.get $0)
    )
    (local.get $1)
   )
  )
 )
 (func $~lib/as-scale-codec/utils/Bytes/Bytes.trimEmptyBytes (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local.set $1
   (i32.sub
    (i32.load offset=12
     (local.get $0)
    )
    (i32.const 1)
   )
  )
  (loop $for-loop|0
   (if
    (i32.gt_s
     (local.get $1)
     (i32.const 0)
    )
    (if
     (i32.eqz
      (call $~lib/array/Array<u8>#__get
       (local.get $0)
       (local.get $1)
      )
     )
     (block
      (if
       (i32.lt_s
        (local.tee $2
         (i32.load offset=12
          (local.get $0)
         )
        )
        (i32.const 1)
       )
       (unreachable)
      )
      (drop
       (i32.load8_u
        (i32.add
         (local.tee $2
          (i32.sub
           (local.get $2)
           (i32.const 1)
          )
         )
         (i32.load offset=4
          (local.get $0)
         )
        )
       )
      )
      (i32.store offset=12
       (local.get $0)
       (local.get $2)
      )
      (local.set $1
       (i32.sub
        (local.get $1)
        (i32.const 1)
       )
      )
      (br $for-loop|0)
     )
    )
   )
  )
 )
 (func $~lib/as-scale-codec/UInt/UInt128/UInt128._computeBitLength (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i64)
  (local $4 i64)
  (local $5 i32)
  (local.set $1
   (local.get $0)
  )
  (local.set $5
   (local.tee $2
    (call $~lib/as-bignum/integer/u128/u128#constructor
     (i64.const 64)
     (i64.const 0)
    )
   )
  )
  (if (result i32)
   (if (result i32)
    (i64.eq
     (local.tee $3
      (i64.load offset=8
       (local.get $0)
      )
     )
     (local.tee $4
      (i64.load offset=8
       (local.get $2)
      )
     )
    )
    (i64.lt_u
     (i64.load
      (local.get $1)
     )
     (i64.load
      (local.get $5)
     )
    )
    (i64.lt_u
     (local.get $3)
     (local.get $4)
    )
   )
   (i32.const 1)
   (block (result i32)
    (local.set $2
     (local.tee $1
      (call $~lib/as-bignum/integer/u128/u128#constructor
       (i64.const 16384)
       (i64.const 0)
      )
     )
    )
    (if (result i32)
     (if (result i32)
      (i64.eq
       (local.tee $3
        (i64.load offset=8
         (local.get $0)
        )
       )
       (local.tee $4
        (i64.load offset=8
         (local.get $1)
        )
       )
      )
      (i64.lt_u
       (i64.load
        (local.get $0)
       )
       (i64.load
        (local.get $2)
       )
      )
      (i64.lt_u
       (local.get $3)
       (local.get $4)
      )
     )
     (i32.const 2)
     (block (result i32)
      (local.set $2
       (local.tee $1
        (call $~lib/as-bignum/integer/u128/u128#constructor
         (i64.const 1073741824)
         (i64.const 0)
        )
       )
      )
      (if (result i32)
       (if (result i32)
        (i64.eq
         (local.tee $3
          (i64.load offset=8
           (local.get $0)
          )
         )
         (local.tee $4
          (i64.load offset=8
           (local.get $1)
          )
         )
        )
        (i64.lt_u
         (i64.load
          (local.get $0)
         )
         (i64.load
          (local.get $2)
         )
        )
        (i64.lt_u
         (local.get $3)
         (local.get $4)
        )
       )
       (i32.const 4)
       (block (result i32)
        (i64.store
         (local.tee $2
          (i32.load offset=4
           (local.tee $1
            (call $~lib/array/Array<u8>#constructor
             (i32.const 16)
            )
           )
          )
         )
         (i64.load
          (local.get $0)
         )
        )
        (i64.store offset=8
         (local.get $2)
         (i64.load offset=8
          (local.get $0)
         )
        )
        (call $~lib/as-scale-codec/utils/Bytes/Bytes.trimEmptyBytes
         (local.get $1)
        )
        (i32.add
         (i32.load offset=12
          (local.get $1)
         )
         (i32.const 1)
        )
       )
      )
     )
    )
   )
  )
 )
 (func $~lib/as-scale-codec/interfaces/DecodedData/DecodedData<u64>#constructor (param $0 i64) (param $1 i32) (result i32)
  (local $2 i32)
  (i64.store
   (local.tee $2
    (call $~lib/rt/stub/__new
     (i32.const 12)
     (i32.const 26)
    )
   )
   (local.get $0)
  )
  (i32.store offset=8
   (local.get $2)
   (local.get $1)
  )
  (local.get $2)
 )
 (func $~lib/array/Array<u8>#__set (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (if
   (i32.ge_u
    (local.get $1)
    (i32.load offset=12
     (local.get $0)
    )
   )
   (block
    (if
     (i32.lt_s
      (local.get $1)
      (i32.const 0)
     )
     (unreachable)
    )
    (call $~lib/array/ensureSize
     (local.get $0)
     (local.tee $3
      (i32.add
       (local.get $1)
       (i32.const 1)
      )
     )
     (i32.const 0)
    )
    (i32.store offset=12
     (local.get $0)
     (local.get $3)
    )
   )
  )
  (i32.store8
   (i32.add
    (i32.load offset=4
     (local.get $0)
    )
    (local.get $1)
   )
   (local.get $2)
  )
 )
 (func $~lib/as-scale-codec/utils/Bytes/Bytes.copy<u8> (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (loop $for-loop|0
   (if
    (i32.lt_s
     (local.get $3)
     (i32.load offset=12
      (local.get $1)
     )
    )
    (if
     (i32.lt_s
      (local.get $3)
      (i32.load offset=12
       (local.get $0)
      )
     )
     (block
      (call $~lib/array/Array<u8>#__set
       (local.get $1)
       (i32.add
        (local.get $2)
        (local.get $3)
       )
       (call $~lib/array/Array<u8>#__get
        (local.get $0)
        (local.get $3)
       )
      )
      (local.set $3
       (i32.add
        (local.get $3)
        (i32.const 1)
       )
      )
      (br $for-loop|0)
     )
    )
   )
  )
 )
 (func $~lib/as-scale-codec/utils/Bytes/Bytes.decodeSmallInt (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (if
   (i32.eqz
    (select
     (i32.const 1)
     (i32.eq
      (local.tee $2
       (i32.and
        (local.get $1)
        (i32.const 255)
       )
      )
      (i32.const 2)
     )
     (select
      (i32.eq
       (local.get $2)
       (i32.const 1)
      )
      (i32.const 1)
      (local.get $2)
     )
    )
   )
   (unreachable)
  )
  (if (result i32)
   (i32.and
    (local.get $1)
    (i32.const 255)
   )
   (if (result i32)
    (i32.eq
     (i32.and
      (local.get $1)
      (i32.const 255)
     )
     (i32.const 1)
    )
    (block (result i32)
     (if
      (i32.lt_s
       (i32.load offset=12
        (local.get $0)
       )
       (i32.const 2)
      )
      (unreachable)
     )
     (i32.store8
      (local.tee $2
       (i32.load offset=4
        (local.tee $1
         (call $~lib/rt/__newArray
          (i32.const 2)
          (i32.const 0)
         )
        )
       )
      )
      (call $~lib/array/Array<u8>#__get
       (local.get $0)
       (i32.const 0)
      )
     )
     (i32.store8 offset=1
      (local.get $2)
      (call $~lib/array/Array<u8>#__get
       (local.get $0)
       (i32.const 1)
      )
     )
     (call $~lib/as-scale-codec/utils/Bytes/Bytes.copy<u8>
      (local.get $1)
      (local.tee $2
       (call $~lib/array/Array<u8>#constructor
        (i32.const 2)
       )
      )
      (i32.const 0)
     )
     (local.set $1
      (call $~lib/array/Array<u8>#__get
       (local.get $2)
       (i32.const 0)
      )
     )
     (local.set $0
      (i32.const 1)
     )
     (loop $for-loop|1
      (if
       (i32.lt_s
        (local.get $0)
        (i32.const 2)
       )
       (block
        (local.set $1
         (i32.or
          (local.get $1)
          (i32.shl
           (call $~lib/array/Array<u8>#__get
            (local.get $2)
            (local.get $0)
           )
           (i32.and
            (i32.shl
             (i32.and
              (local.get $0)
              (i32.const 255)
             )
             (i32.const 3)
            )
            (i32.const 15)
           )
          )
         )
        )
        (local.set $0
         (i32.add
          (local.get $0)
          (i32.const 1)
         )
        )
        (br $for-loop|1)
       )
      )
     )
     (call $~lib/as-scale-codec/interfaces/DecodedData/DecodedData<u64>#constructor
      (i64.extend_i32_u
       (i32.shr_u
        (i32.and
         (local.get $1)
         (i32.const 65535)
        )
        (i32.const 2)
       )
      )
      (i32.const 2)
     )
    )
    (block (result i32)
     (if
      (i32.lt_s
       (i32.load offset=12
        (local.get $0)
       )
       (i32.const 4)
      )
      (unreachable)
     )
     (i32.store8
      (local.tee $1
       (i32.load offset=4
        (local.tee $2
         (call $~lib/rt/__newArray
          (i32.const 4)
          (i32.const 0)
         )
        )
       )
      )
      (call $~lib/array/Array<u8>#__get
       (local.get $0)
       (i32.const 0)
      )
     )
     (i32.store8 offset=1
      (local.get $1)
      (call $~lib/array/Array<u8>#__get
       (local.get $0)
       (i32.const 1)
      )
     )
     (i32.store8 offset=2
      (local.get $1)
      (call $~lib/array/Array<u8>#__get
       (local.get $0)
       (i32.const 2)
      )
     )
     (i32.store8 offset=3
      (local.get $1)
      (call $~lib/array/Array<u8>#__get
       (local.get $0)
       (i32.const 3)
      )
     )
     (call $~lib/as-scale-codec/utils/Bytes/Bytes.copy<u8>
      (local.get $2)
      (local.tee $2
       (call $~lib/array/Array<u8>#constructor
        (i32.const 4)
       )
      )
      (i32.const 0)
     )
     (local.set $1
      (call $~lib/array/Array<u8>#__get
       (local.get $2)
       (i32.const 0)
      )
     )
     (local.set $0
      (i32.const 1)
     )
     (loop $for-loop|0
      (if
       (i32.lt_s
        (local.get $0)
        (i32.const 4)
       )
       (block
        (local.set $1
         (i32.or
          (local.get $1)
          (i32.shl
           (call $~lib/array/Array<u8>#__get
            (local.get $2)
            (local.get $0)
           )
           (i32.shl
            (i32.and
             (local.get $0)
             (i32.const 255)
            )
            (i32.const 3)
           )
          )
         )
        )
        (local.set $0
         (i32.add
          (local.get $0)
          (i32.const 1)
         )
        )
        (br $for-loop|0)
       )
      )
     )
     (call $~lib/as-scale-codec/interfaces/DecodedData/DecodedData<u64>#constructor
      (i64.extend_i32_u
       (i32.shr_u
        (local.get $1)
        (i32.const 2)
       )
      )
      (i32.const 4)
     )
    )
   )
   (call $~lib/as-scale-codec/interfaces/DecodedData/DecodedData<u64>#constructor
    (i64.extend_i32_u
     (i32.shr_u
      (i32.and
       (call $~lib/array/Array<u8>#__get
        (local.get $0)
        (i32.const 0)
       )
       (i32.const 255)
      )
      (i32.const 2)
     )
    )
    (i32.const 1)
   )
  )
 )
 (func $~lib/array/Array<u8>#push (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (call $~lib/array/ensureSize
   (local.get $0)
   (local.tee $3
    (i32.add
     (local.tee $2
      (i32.load offset=12
       (local.get $0)
      )
     )
     (i32.const 1)
    )
   )
   (i32.const 0)
  )
  (i32.store8
   (i32.add
    (local.get $2)
    (i32.load offset=4
     (local.get $0)
    )
   )
   (local.get $1)
  )
  (i32.store offset=12
   (local.get $0)
   (local.get $3)
  )
 )
 (func $~lib/as-scale-codec/UInt/UInt128/UInt128#populateFromBytes (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (if
   (i32.le_s
    (i32.load offset=12
     (local.get $1)
    )
    (i32.const 0)
   )
   (unreachable)
  )
  (local.set $1
   (block $__inlined_func$~lib/as-scale-codec/UInt/UInt128/UInt128._computeValue (result i32)
    (if
     (i32.le_u
      (local.tee $2
       (i32.and
        (call $~lib/array/Array<u8>#__get
         (local.get $1)
         (i32.const 0)
        )
        (i32.const 3)
       )
      )
      (i32.const 2)
     )
     (br $__inlined_func$~lib/as-scale-codec/UInt/UInt128/UInt128._computeValue
      (call $~lib/as-bignum/integer/u128/u128#constructor
       (i64.load
        (call $~lib/as-scale-codec/utils/Bytes/Bytes.decodeSmallInt
         (local.get $1)
         (local.get $2)
        )
       )
       (i64.const 0)
      )
     )
    )
    (local.set $2
     (i32.const 0)
    )
    (local.set $3
     (local.tee $1
      (call $~lib/array/Array<u8>#slice
       (local.get $1)
       (i32.const 1)
       (i32.add
        (i32.and
         (i32.add
          (i32.shr_u
           (call $~lib/array/Array<u8>#__get
            (local.get $1)
            (i32.const 0)
           )
           (i32.const 2)
          )
          (i32.const 4)
         )
         (i32.const 255)
        )
        (i32.const 1)
       )
      )
     )
    )
    (if
     (i32.gt_s
      (i32.load offset=12
       (local.get $1)
      )
      (i32.const 16)
     )
     (unreachable)
    )
    (local.set $4
     (i32.sub
      (i32.const 16)
      (i32.load offset=12
       (local.get $3)
      )
     )
    )
    (loop $for-loop|0
     (if
      (i32.lt_s
       (local.get $2)
       (local.get $4)
      )
      (block
       (call $~lib/array/Array<u8>#push
        (local.get $3)
        (i32.const 0)
       )
       (local.set $2
        (i32.add
         (local.get $2)
         (i32.const 1)
        )
       )
       (br $for-loop|0)
      )
     )
    )
    (if
     (i32.eqz
      (if (result i32)
       (i32.load offset=12
        (local.get $1)
       )
       (i32.eqz
        (i32.and
         (i32.load offset=12
          (local.get $1)
         )
         (i32.const 15)
        )
       )
       (i32.const 0)
      )
     )
     (unreachable)
    )
    (call $~lib/as-bignum/integer/u128/u128#constructor
     (i64.load
      (local.tee $1
       (i32.load offset=4
        (local.get $1)
       )
      )
     )
     (i64.load offset=8
      (local.get $1)
     )
    )
   )
  )
  (drop
   (i32.load
    (local.get $0)
   )
  )
  (i32.store
   (local.get $0)
   (local.get $1)
  )
  (i32.store offset=4
   (local.get $0)
   (call $~lib/as-scale-codec/UInt/UInt128/UInt128._computeBitLength
    (i32.load
     (local.get $0)
    )
   )
  )
 )
 (func $event/call (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (call $event/EventEmitter#constructor)
  (local.set $0
   (call $~lib/rt/__newArray
    (i32.const 4)
    (i32.const 1248)
   )
  )
  (if
   (call $../../src/buildins/Msg/Msg#isSelector
    (global.get $event/msg)
    (local.get $0)
   )
   (block
    (i32.store
     (block (result i32)
      (if
       (i32.eqz
        (local.tee $0
         (call $~lib/rt/stub/__new
          (i32.const 12)
          (i32.const 17)
         )
        )
       )
       (local.set $0
        (call $~lib/rt/stub/__new
         (i32.const 0)
         (i32.const 18)
        )
       )
      )
      (local.get $0)
     )
     (i32.const 0)
    )
    (i32.store offset=4
     (local.get $0)
     (i32.const 0)
    )
    (i32.store offset=8
     (local.get $0)
     (i32.const 0)
    )
    (i32.store
     (local.get $0)
     (call $~lib/as-scale-codec/UInt/UInt8/UInt8#constructor
      (i32.const 9)
     )
    )
    (i32.store offset=4
     (local.get $0)
     (call $~lib/as-scale-codec/UInt/UInt8/UInt8#constructor
      (i32.const 10)
     )
    )
    (i32.store8
     (local.tee $1
      (call $~lib/rt/stub/__new
       (i32.const 1)
       (i32.const 22)
      )
     )
     (i32.const 0)
    )
    (i32.store8
     (local.get $1)
     (i32.const 0)
    )
    (i32.store offset=8
     (local.get $0)
     (local.get $1)
    )
    (call $../../src/buildins/Event/Event.emit<event/Approved>
     (local.get $0)
    )
   )
   (block
    (if
     (i32.eqz
      (i32.load offset=4
       (local.tee $1
        (global.get $event/msg)
       )
      )
     )
     (block
      (local.set $2
       (call $~lib/as-bignum/integer/u128/u128#constructor
        (i64.const 0)
        (i64.const 0)
       )
      )
      (i32.store
       (local.tee $0
        (call $~lib/rt/stub/__new
         (i32.const 8)
         (i32.const 8)
        )
       )
       (i32.const 0)
      )
      (i32.store offset=4
       (local.get $0)
       (i32.const 0)
      )
      (drop
       (i32.load
        (local.get $0)
       )
      )
      (i32.store
       (local.get $0)
       (local.get $2)
      )
      (i32.store offset=4
       (local.get $0)
       (call $~lib/as-scale-codec/UInt/UInt128/UInt128._computeBitLength
        (local.get $2)
       )
      )
      (call_indirect (type $i32_i32_=>_none)
       (call $../../src/primitives/readbuffer/ReadBuffer#get:valueBuffer
        (local.tee $2
         (call $../../src/primitives/readbuffer/ReadBuffer#constructor
          (i32.load offset=4
           (local.get $0)
          )
         )
        )
       )
       (call $../../src/primitives/readbuffer/ReadBuffer#get:sizeBuffer
        (local.get $2)
       )
       (i32.load
        (i32.const 1280)
       )
      )
      (call $~lib/as-scale-codec/UInt/UInt128/UInt128#populateFromBytes
       (local.get $0)
       (call $../../src/primitives/readbuffer/ReadBuffer#get:valueBytes
        (local.get $2)
       )
      )
      (drop
       (i32.load offset=4
        (local.get $1)
       )
      )
      (i32.store offset=4
       (local.get $1)
       (local.get $0)
      )
     )
    )
    (if
     (i32.eqz
      (local.tee $0
       (i32.load offset=4
        (local.get $1)
       )
      )
     )
     (unreachable)
    )
    (drop
     (i64.load
      (i32.load
       (local.get $0)
      )
     )
    )
   )
  )
  (i32.const 0)
 )
 (func $~start
  (local $0 i32)
  (global.set $~lib/rt/stub/offset
   (i32.const 1292)
  )
  (drop
   (call $~lib/rt/stub/__new
    (i32.const 0)
    (i32.const 3)
   )
  )
  (global.set $../../src/buildins/Event/Event._topics
   (call $~lib/array/Array<~lib/as-scale-codec/interfaces/Codec/Codec>#constructor)
  )
  (global.set $../../src/buildins/Event/Event._data
   (call $~lib/array/Array<~lib/as-scale-codec/interfaces/Codec/Codec>#constructor)
  )
  (i32.store
   (local.tee $0
    (call $~lib/rt/stub/__new
     (i32.const 16)
     (i32.const 6)
    )
   )
   (i32.const 0)
  )
  (i32.store offset=4
   (local.get $0)
   (i32.const 0)
  )
  (i32.store offset=8
   (local.get $0)
   (i32.const 0)
  )
  (i32.store offset=12
   (local.get $0)
   (i32.const 0)
  )
  (global.set $event/msg
   (local.get $0)
  )
 )
 (func $~lib/as-scale-codec/UInt/UInt128/UInt128#toU8a (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i64)
  (local $7 i64)
  (local.set $2
   (call $~lib/array/Array<u8>#constructor
    (i32.const 0)
   )
  )
  (local.set $3
   (local.tee $1
    (i32.load
     (local.get $0)
    )
   )
  )
  (local.set $5
   (local.tee $4
    (call $~lib/as-bignum/integer/u128/u128#constructor
     (i64.const 64)
     (i64.const 0)
    )
   )
  )
  (if
   (if (result i32)
    (i64.eq
     (local.tee $6
      (i64.load offset=8
       (local.get $1)
      )
     )
     (local.tee $7
      (i64.load offset=8
       (local.get $4)
      )
     )
    )
    (i64.lt_u
     (i64.load
      (local.get $3)
     )
     (i64.load
      (local.get $5)
     )
    )
    (i64.lt_u
     (local.get $6)
     (local.get $7)
    )
   )
   (block
    (call $~lib/array/Array<u8>#push
     (local.get $2)
     (local.tee $1
      (i32.shl
       (i32.wrap_i64
        (i64.load
         (i32.load
          (local.get $0)
         )
        )
       )
       (i32.const 2)
      )
     )
    )
    (local.set $0
     (i32.const 1)
    )
    (loop $for-loop|1
     (if
      (f64.lt
       (f64.convert_i32_u
        (local.get $0)
       )
       (f64.const 1)
      )
      (block
       (call $~lib/array/Array<u8>#push
        (local.get $2)
        (i32.shr_u
         (i32.and
          (local.get $1)
          (i32.const 255)
         )
         (i32.and
          (i32.shl
           (local.get $0)
           (i32.const 3)
          )
          (i32.const 7)
         )
        )
       )
       (local.set $0
        (i32.add
         (local.get $0)
         (i32.const 1)
        )
       )
       (br $for-loop|1)
      )
     )
    )
   )
   (block
    (local.set $3
     (local.tee $1
      (i32.load
       (local.get $0)
      )
     )
    )
    (local.set $5
     (local.tee $4
      (call $~lib/as-bignum/integer/u128/u128#constructor
       (i64.const 16384)
       (i64.const 0)
      )
     )
    )
    (if
     (if (result i32)
      (i64.eq
       (local.tee $6
        (i64.load offset=8
         (local.get $1)
        )
       )
       (local.tee $7
        (i64.load offset=8
         (local.get $4)
        )
       )
      )
      (i64.lt_u
       (i64.load
        (local.get $3)
       )
       (i64.load
        (local.get $5)
       )
      )
      (i64.lt_u
       (local.get $6)
       (local.get $7)
      )
     )
     (block
      (call $~lib/array/Array<u8>#push
       (local.get $2)
       (local.tee $1
        (i32.add
         (i32.shl
          (i32.wrap_i64
           (i64.load
            (i32.load
             (local.get $0)
            )
           )
          )
          (i32.const 2)
         )
         (i32.const 1)
        )
       )
      )
      (local.set $0
       (i32.const 1)
      )
      (loop $for-loop|13
       (if
        (f64.lt
         (f64.convert_i32_u
          (local.get $0)
         )
         (f64.const 2)
        )
        (block
         (call $~lib/array/Array<u8>#push
          (local.get $2)
          (i32.shr_u
           (i32.and
            (local.get $1)
            (i32.const 65535)
           )
           (i32.and
            (i32.shl
             (local.get $0)
             (i32.const 3)
            )
            (i32.const 15)
           )
          )
         )
         (local.set $0
          (i32.add
           (local.get $0)
           (i32.const 1)
          )
         )
         (br $for-loop|13)
        )
       )
      )
     )
     (block
      (local.set $3
       (local.tee $1
        (i32.load
         (local.get $0)
        )
       )
      )
      (local.set $5
       (local.tee $4
        (call $~lib/as-bignum/integer/u128/u128#constructor
         (i64.const 1073741824)
         (i64.const 0)
        )
       )
      )
      (if
       (if (result i32)
        (i64.eq
         (local.tee $6
          (i64.load offset=8
           (local.get $1)
          )
         )
         (local.tee $7
          (i64.load offset=8
           (local.get $4)
          )
         )
        )
        (i64.lt_u
         (i64.load
          (local.get $3)
         )
         (i64.load
          (local.get $5)
         )
        )
        (i64.lt_u
         (local.get $6)
         (local.get $7)
        )
       )
       (block
        (call $~lib/array/Array<u8>#push
         (local.get $2)
         (local.tee $1
          (i32.add
           (i32.shl
            (i32.wrap_i64
             (i64.load
              (i32.load
               (local.get $0)
              )
             )
            )
            (i32.const 2)
           )
           (i32.const 2)
          )
         )
        )
        (local.set $0
         (i32.const 1)
        )
        (loop $for-loop|16
         (if
          (f64.lt
           (f64.convert_i32_u
            (local.get $0)
           )
           (f64.const 4)
          )
          (block
           (call $~lib/array/Array<u8>#push
            (local.get $2)
            (i32.shr_u
             (local.get $1)
             (i32.shl
              (local.get $0)
              (i32.const 3)
             )
            )
           )
           (local.set $0
            (i32.add
             (local.get $0)
             (i32.const 1)
            )
           )
           (br $for-loop|16)
          )
         )
        )
       )
       (block
        (local.set $1
         (i32.load
          (local.get $0)
         )
        )
        (i64.store
         (local.tee $3
          (i32.load offset=4
           (local.tee $0
            (call $~lib/array/Array<u8>#constructor
             (i32.const 16)
            )
           )
          )
         )
         (i64.load
          (local.get $1)
         )
        )
        (i64.store offset=8
         (local.get $3)
         (i64.load offset=8
          (local.get $1)
         )
        )
        (call $~lib/as-scale-codec/utils/Bytes/Bytes.trimEmptyBytes
         (local.get $0)
        )
        (call $~lib/array/Array<u8>#push
         (local.get $2)
         (i32.add
          (i32.shl
           (i32.load offset=12
            (local.get $0)
           )
           (i32.const 2)
          )
          (i32.const -13)
         )
        )
        (call $~lib/as-scale-codec/utils/Bytes/Bytes.copy<u8>
         (local.get $0)
         (local.get $2)
         (i32.const 1)
        )
       )
      )
     )
    )
   )
  )
  (local.get $2)
 )
 (func $~lib/as-scale-codec/interfaces/Codec/Codec#toU8a@virtual (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 f64)
  (local $3 i32)
  (block $default
   (block $case2
    (block $case1
     (if
      (i32.ne
       (local.tee $1
        (i32.load
         (i32.sub
          (local.get $0)
          (i32.const 8)
         )
        )
       )
       (i32.const 22)
      )
      (block
       (br_if $case1
        (i32.eq
         (local.get $1)
         (i32.const 8)
        )
       )
       (br_if $case2
        (i32.or
         (i32.eq
          (local.get $1)
          (i32.const 20)
         )
         (i32.eq
          (local.get $1)
          (i32.const 19)
         )
        )
       )
       (br $default)
      )
     )
     (call $~lib/array/Array<u8>#__set
      (local.tee $1
       (call $~lib/array/Array<u8>#constructor
        (i32.const 1)
       )
      )
      (i32.const 0)
      (i32.eqz
       (i32.eqz
        (i32.load8_u
         (local.get $0)
        )
       )
      )
     )
     (return
      (local.get $1)
     )
    )
    (return
     (call $~lib/as-scale-codec/UInt/UInt128/UInt128#toU8a
      (local.get $0)
     )
    )
   )
   (local.set $1
    (call $~lib/array/Array<u8>#constructor
     (i32.load
      (local.get $0)
     )
    )
   )
   (local.set $2
    (f64.convert_i32_s
     (i32.load
      (local.get $0)
     )
    )
   )
   (call $~lib/array/Array<u8>#__set
    (local.get $1)
    (i32.const 0)
    (local.tee $3
     (i32.load8_u offset=4
      (local.get $0)
     )
    )
   )
   (local.set $0
    (i32.const 1)
   )
   (loop $for-loop|1
    (if
     (f64.gt
      (local.get $2)
      (f64.convert_i32_u
       (local.get $0)
      )
     )
     (block
      (call $~lib/array/Array<u8>#__set
       (local.get $1)
       (i32.and
        (local.get $0)
        (i32.const 255)
       )
       (i32.shr_u
        (local.get $3)
        (i32.and
         (i32.shl
          (local.get $0)
          (i32.const 3)
         )
         (i32.const 7)
        )
       )
      )
      (local.set $0
       (i32.add
        (local.get $0)
        (i32.const 1)
       )
      )
      (br $for-loop|1)
     )
    )
   )
   (return
    (local.get $1)
   )
  )
  (unreachable)
 )
)
